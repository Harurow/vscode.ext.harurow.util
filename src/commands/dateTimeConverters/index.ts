import { toIsoDateTime } from './toIsoDateTime'
import {
    regReplace
} from '../../utils'

export {
    toIsoDateTime
}

export const toIsoDateTimeCommand = (command: string) => regReplace(command, toIsoDateTime)
