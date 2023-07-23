import {useEffect, useState} from "react";
import {getConfigs} from "@utils/fs-utils";

const useFormNames = () => {
    const [formNames, setFormNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const refresh = () => {
        if (isLoading) return;
        setIsLoading(true)
        getConfigs().then((data: string[]) => {
            setFormNames(data)
            setIsLoading(false)
        })
    }

    useEffect(() =>{
        refresh()
    }, [])

    return {
        formNames,
        refresh,
        isLoading
    }
}

export default useFormNames
