export const frontendOnly = <T>(callback: (...args: any[]) => any, defaultReturn?: T) => {
    if (typeof window !== 'undefined') {
        return callback()
    }
    return null;
}
