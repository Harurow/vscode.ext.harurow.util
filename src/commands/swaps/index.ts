import {
    regReplace
} from '../../utils'

import {
    swapLr,
} from './lr'

export const swapLrCommand = (command: string) => regReplace(command, swapLr)
