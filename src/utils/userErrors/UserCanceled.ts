import '../extension'

export class UserCanceled extends Error {
  readonly silent: boolean
  constructor (silent: boolean = true) {
    super('canceled'.toLocalize())
    this.silent = silent
  }
}
