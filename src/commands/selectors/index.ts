import {
    regWhole,
} from '../../utils'

import {
    selectWhenMatchSubstring,
    selectWhenMatchPattern,
    selectWhenMatchPatternIgnoreCase,
} from './selector'

export const selectWhenMatchSubstringCommand = (command: string) => regWhole(command, selectWhenMatchSubstring)
export const selectWhenMatchPatternCommand = (command: string) => regWhole(command, selectWhenMatchPattern)
export const selectWhenMatchPatternIgnoreCaseCommand = (command: string) => regWhole(command, selectWhenMatchPatternIgnoreCase)
