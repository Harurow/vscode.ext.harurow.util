/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* tslint:disable no-require-imports */
import * as fs from 'fs'
import * as glob from 'glob'
import * as path from 'path'

const istanbul = require('istanbul')
const Mocha = require('mocha')
const remapIstanbul = require('remap-istanbul')
const tty = require('tty')

declare var global: any

// Linux: prevent a weird NPE when mocha on Linux requires the window size from the TTY
// Since we are not running in a tty environment, we just implementt he method statically
if (!tty.getWindowSize) {
  tty.getWindowSize = (): number[] => {
    return [80, 75]
  }
}

interface ITestRunnerOptions {
  enabled?: boolean
  relativeCoverageDir: string
  relativeSourcePath: string
  ignorePatterns: string[]
  includePid?: boolean
  reports?: string[]
  verbose?: boolean
}

let mocha = new Mocha({
  ui: 'bdd',
  color: true,
})

export const configure = (mochaOpts: any): void => {
  mocha = new Mocha(mochaOpts)
}

export const run = async (testsRoot: string): Promise<void> => {
  const readCoverOptions = (testsRoot: string): ITestRunnerOptions | undefined => {
    const coverConfigPath = path.resolve(testsRoot, '../../../../coverconfig.json')
    if (fs.existsSync(coverConfigPath)) {
      const configContent = fs.readFileSync(coverConfigPath, 'utf-8')
      return JSON.parse(configContent)
    }
    return undefined
  }

  return new Promise((resolve, reject) => {
    // Read configuration for the coverage file
    const coverOptions = readCoverOptions(testsRoot)
    if (coverOptions?.enabled) {
      // Setup coverage pre-test, including post-test hook to report
      const coverageRunner = new CoverageRunner(coverOptions, testsRoot)
      coverageRunner.setupCoverage()
    }

    // Glob test files
    glob.glob('**/**.test.js', { cwd: testsRoot }, (err: Error | null, files: string[]) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      try {
        // Fill into Mocha
        files.forEach((f): Mocha => mocha.addFile(path.join(testsRoot, f)))
        // Run the tests
        mocha.run((failures: number) => {
          if (failures > 0) {
            reject(new Error(`${failures.toString()} tests failed.`))
          } else {
            resolve()
          }
        })
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

class CoverageRunner {
  private readonly options: ITestRunnerOptions
  private readonly testsRoot: string
  private coverageVar: string = `$$cov_${new Date().getTime().toString()}$$`
  private transformer: any = undefined
  private matchFn: any = undefined
  private instrumenter: any = undefined

  constructor (
    options: ITestRunnerOptions,
    testsRoot: string
  ) {
    this.options = options
    this.testsRoot = testsRoot
  }

  public setupCoverage (): void {
    // Set up Code Coverage, hooking require so that instrumented code is returned
    this.instrumenter = new istanbul.Instrumenter({ coverageVariable: this.coverageVar })
    const sourceRoot = path.join(this.testsRoot, this.options.relativeSourcePath)
    // Glob source files
    const srcFiles = glob.sync('**/**.js', {
      cwd: sourceRoot,
      ignore: this.options.ignorePatterns,
    })
    // Create a match function - taken from the run-with-cover.js in istanbul.
    const decache = require('decache')
    const fileMap: any = {}
    srcFiles.forEach((file) => {
      const fullPath = path.join(sourceRoot, file)
      fileMap[fullPath] = true
      // On Windows, extension is loaded pre-test hooks and this mean we lose
      // our chance to hook the Require call. In order to instrument the code
      // we have to decache the JS file so on next load it gets instrumented.
      // This doesn't impact tests, but is a concern if we had some integration
      // tests that relied on VSCode accessing our module since there could be
      // some shared global state that we lose.
      decache(fullPath)
    })
    this.matchFn = (file: string): boolean => fileMap[file]
    this.matchFn.files = Object.keys(fileMap)
    // Hook up to the Require function so that when this is called, if any of our source files
    // are required, the instrumented version is pulled in instead. These instrumented versions
    // write to a global coverage variable with hit counts whenever they are accessed
    this.transformer = this.instrumenter.instrumentSync.bind(this.instrumenter)
    const hookOpts = { verbose: false, extensions: ['.js'] }
    istanbul.hook.hookRequire(this.matchFn, this.transformer, hookOpts)
    // initialize the global variable to stop mocha from complaining about leaks
    global[this.coverageVar] = {}
    // Hook the process exit event to handle reporting
    // Only report coverage if the process is exiting successfully
    process.on('exit', (code: number) => {
      this.reportCoverage()
      process.exitCode = code
    })
  }

  /**
   * Writes a coverage report.
   * Note that as this is called in the process exit callback, all calls must be synchronous.
   *
   * @returns {void}
   *
   * @memberOf CoverageRunner
   */
  public reportCoverage (): void {
    istanbul.hook.unhookRequire()
    let cov: any
    if (typeof global[this.coverageVar] === 'undefined' || Object.keys(global[this.coverageVar]).length === 0) {
      console.error('No coverage information was collected, exit without writing coverage information')
      return
    } else {
      cov = global[this.coverageVar]
    }
    // TODO consider putting this under a conditional flag
    // Files that are not touched by code ran by the test runner is manually instrumented, to
    // illustrate the missing coverage.
    this.matchFn.files.forEach((file: any) => {
      if (cov[file] != null) {
        return
      }
      this.transformer(fs.readFileSync(file, 'utf-8'), file)
      // When instrumenting the code, istanbul will give each FunctionDeclaration a value of 1 in coverState.s,
      // presumably to compensate for function hoisting. We need to reset this, as the function was not hoisted,
      // as it was never loaded.
      Object.keys(this.instrumenter.coverState.s).forEach((key) => {
        this.instrumenter.coverState.s[key] = 0
      })
      cov[file] = this.instrumenter.coverState
    })
    // TODO Allow config of reporting directory with
    const reportingDir = path.join(this.testsRoot, this.options.relativeCoverageDir)
    const includePid = this.options.includePid
    const pidExt = includePid != null ? (`-${process.pid.toString()}`) : ''
    const coverageFile = path.resolve(reportingDir, `coverage${pidExt}.json`)
    // yes, do this again since some test runners could clean the dir initially created
    this.mkDirIfExists(reportingDir)
    fs.writeFileSync(coverageFile, JSON.stringify(cov), 'utf8')
    const remappedCollector = remapIstanbul.remap(cov, {
      warn: (warning: any) => {
        // We expect some warnings as any JS file without a typescript mapping will cause this.
        // By default, we'll skip printing these to the console as it clutters it up
        if (this.options.verbose != null) {
          console.warn(warning)
        }
      },
    })
    const reporter = new istanbul.Reporter(undefined, reportingDir)
    const reportTypes = (this.options.reports instanceof Array) ? this.options.reports : ['lcov']
    reporter.addAll(reportTypes)
    reporter.write(remappedCollector, true, () => {
      console.log(`reports written to ${reportingDir}`)
      console.log(`${reportingDir}/index.html`)
    })
  }

  private readonly mkDirIfExists = (dir: string): void => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  }
}
