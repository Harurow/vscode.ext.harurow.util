export function validateRegex (invalidate: string): (value: string) => string | undefined {
  return (value) => {
    try {
      if (value !== '' && value !== '\\i') {
        RegExp(value)
        return
      }
    } catch (err) {
    }
    return invalidate
  }
}
