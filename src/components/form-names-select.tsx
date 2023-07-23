import { Select } from "@mantine/core";
import { useMemo } from "react";
import {useForms, useSelectedForm, useSelectForm} from "@contexts/selected-form-context";

const FormNamesSelect = () => {
    const {forms, isLoading} = useForms()
    const selectedForm = useSelectedForm();
    const {selectForm} = useSelectForm()

    const formattedData = useMemo(() => {
        if (isLoading || forms == null) return [ selectedForm ];
        return forms.map((formName: string) => ({
            value: formName,
            label: formName
        }))
    }, [selectedForm, forms, isLoading])

    const onChange = (newName: string) => {
        const match = forms.find((name: string) => name === newName);
        if (match == null) {
            throw new Error('Form doesnt exist')
        }
        selectForm(match)
    }

    return <Select onChange={onChange} value={selectedForm} disabled={isLoading} data={formattedData}/>
}

export default FormNamesSelect
