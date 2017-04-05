export const throwIf = (condition: boolean, exception: any) => {
    if (condition) {
        throw exception
    }
}
