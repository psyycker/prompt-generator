import {useEffect, useState} from "react";
import {IForm} from "@typedefs/form";
import {getConfig} from "@utils/fs-utils";

const useForm = (formName: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<IForm>()

    useEffect(() => {
        if (formName != null && !isLoading) {
            setIsLoading(true);
            getConfig(formName).then(config => {
                setForm(config);
                setIsLoading(false);
            })
        }
    }, [formName])

    return {
        isLoading,
        form
    };
}

export default useForm;
