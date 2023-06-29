import {frontendOnly} from "@utils/frontend-only";

export const setValue = <T>(key: string, value: T) => {
    frontendOnly(() => localStorage.setItem(key, JSON.stringify(value)))
}

export const getValue = <T>(key: string, defaultValue: T) => {
    return frontendOnly(() => {
        const item = localStorage.getItem(key)
        if (item == null) return defaultValue;
        return JSON.parse(item) as T
    }, defaultValue)
}
