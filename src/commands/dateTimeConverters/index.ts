import { toIsoDateTime } from './toIsoDateTime'
import { toCSharpDateTime } from './toCSharpDateTime'
import {
    regReplace
} from '../../utils'

export {
    toIsoDateTime,
    toCSharpDateTime,
}

export const toIsoDateTimeCommand = (command: string) => regReplace(command, toIsoDateTime)
export const toCSharpDateTimeCommand = (command: string) => regReplace(command, toCSharpDateTime)
