import {useEffect, useState} from "react";
import {IForm} from "@typedefs/form";

export type TYPE = 'Category' | 'Checkbox' | string

const useFormEdition = (form: IForm, isLoading: boolean) => {
    const [localForm, setLocalForm] = useState<IForm>()

    useEffect(() => {
        if (!isLoading) {
            setLocalForm(form)
        }
    }, [isLoading, form])

    const createItem = (type: TYPE) => {

    }

    return {
        createItem,
        localForm
    }
}

export default useFormEdition;
