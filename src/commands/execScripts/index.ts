import {
    regExec,
} from '../../utils'

import {
    execScript,
} from './execScripts'

export const execScriptCommand = (command: string) => regExec(command, execScript)
