import '../utils'

export class UserCanceled extends Error {
  constructor () {
    super('canceled'.toLocalize())
  }
}
