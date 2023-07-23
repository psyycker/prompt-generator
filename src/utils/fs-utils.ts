import {frontendOnly} from "@utils/frontend-only";
import type {fs as FsType} from "@tauri-apps/api";
import IAppConfig from "@typedefs/app-config";
import {IForm} from "@typedefs/form";

export const saveConfig = (name: string, config: IForm): void => {

}

export const getConfig = (name: string): Promise<IForm> => {
    return frontendOnly<Promise<IForm>>(async () => {
        const path = await getConfigPath(name);
        const fs = await getFs();
        const configStr = await fs.readTextFile(path);
        return JSON.parse(configStr)
    })
}

const getBaseUrl = async () => {
    return await frontendOnly(async () => {
        const {documentDir} = await import('@tauri-apps/api/path');
        return `${await documentDir()}promptgen`;
    })
}

const getConfigsBaseUrl = () => {
    return frontendOnly(async () => {
        const baseUrl = await getBaseUrl();
        return `${baseUrl}/configs`
    })
}

const getAppConfigUrl = () => {
    return frontendOnly(async () => {
        const baseUrl = await getBaseUrl();
        return `${baseUrl}/app-config.json`
    })
}

let checkDone = false;

const getFs = async (): Promise<typeof FsType> => {
    return frontendOnly(async() => {
        const {fs} = await import('@tauri-apps/api')
        const baseUrl = await getBaseUrl();
        const exists = await fs.exists(baseUrl)
        if (!checkDone) {
            if (!exists) {
                await fs.createDir(baseUrl)
            }
            if (!(await fs.exists(await getConfigsBaseUrl()))) {
                await fs.createDir(await getConfigsBaseUrl())
            }
            if (!(await fs.exists(await getAppConfigUrl()))) {
                await fs.writeTextFile(await getAppConfigUrl(), '{}')
            }
            checkDone = true;
        }
        return fs;
    })
}

export const getConfigs = () => {
    return frontendOnly(async () => {
        const fs = await getFs()
        const items = await fs.readDir(await getConfigsBaseUrl())
        return items.reduce((acc: string[], config): string[] => {
            if (config.name == null) return acc;
            const configName = config.name.split('.json')
            return [...acc, configName[0]]
        }, [])
    })
}

export const getAppConfig = (): Promise<IAppConfig> => {
    return frontendOnly(async () => {
        const fs = await getFs();
        const configStr = await fs.readTextFile(await getAppConfigUrl())
        return JSON.parse(configStr)
    })
}

export const saveAppConfig = (appConfig: IAppConfig) => {
    return frontendOnly(async () => {
        const fs = await getFs();
        fs.writeTextFile(await getAppConfigUrl(), JSON.stringify(appConfig, undefined, 2))
    })
}

const getConfigPath = (name: string) => {
    return frontendOnly(async () => {
        const configsPath = await getConfigsBaseUrl();
        return `${configsPath}/${name}.json`
    })
}

export const createNewConfig = (name: string) => {
    return frontendOnly(async () => {
        const fs = await getFs();
        const newPath = await getConfigPath(name);
        const emptyContent: IForm = {
            content: {
                categories: []
            }
        }
        await fs.writeTextFile(newPath, JSON.stringify(emptyContent, undefined, 2))
    })
}

export const configExists = (name: string) => {
    return frontendOnly(async () => {
        const fs = await getFs();
        const newPath = await getConfigPath(name)
        return fs.exists(newPath);
    })
}
