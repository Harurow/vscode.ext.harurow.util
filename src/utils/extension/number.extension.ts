/* eslint-disable no-extend-native */

export {}

declare global {
  interface Number {
    toHex (length: number): string
  }
}

Number.prototype.toHex = function (length: number): string {
  const hex = this.toString(16)
  if (length <= hex.length) {
    return hex
  }
  return '0'.repeat(length - hex.length) + hex
}
