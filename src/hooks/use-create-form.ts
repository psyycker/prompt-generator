import {useEffect, useState} from "react";
import {useDebounce} from 'usehooks-ts'
import {useSelectForm} from "@contexts/selected-form-context";
import {useRouter} from "next/router";
import {configExists, createNewConfig} from "@utils/fs-utils";
import {useInputState} from "@mantine/hooks";

const useCreateForm = (onCreate: () => void) => {
    const { selectForm } = useSelectForm()
    const router = useRouter()
    const [formName, setFormName] = useInputState('')
    const [exists, setExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedFormName = useDebounce(formName, 500)

    useEffect(() => {
        setIsLoading(true)
    }, [formName])

    useEffect(() => {
        setIsLoading(true)

        const checkIfNameExists = async () => {
            if (debouncedFormName !== '') {
                const exists = await configExists(debouncedFormName)
                setExists(exists)
            }
            setIsLoading(false)
        }

        checkIfNameExists()

    }, [debouncedFormName])

    const submit = async () => {
        if (isLoading) return;
        setIsLoading(true);
        await createNewConfig(debouncedFormName);
        selectForm(debouncedFormName, true)
        router.push('/form/edit')
        setFormName('')
        onCreate()
    }

    return {
        formName,
        exists,
        isLoading,
        submit,
        setFormName
    }
}

export default useCreateForm;
