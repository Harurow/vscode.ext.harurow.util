export const swapLr = (str: string) =>
    str.replace(/^([\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*[=:][\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*;?)$/gm, '$1$4$3$2$5')
