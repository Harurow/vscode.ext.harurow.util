import {
    regWhole,
} from '../../utils'

import {
    numbering
} from './numbering'

export const numberingCommand = (command: string) => regWhole(command, numbering)
