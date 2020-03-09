import fileExclude from './fileExclude'
import generateDts from './generateDts'

const cmdTable = [
  ...fileExclude,
  ...generateDts
]

export default cmdTable
