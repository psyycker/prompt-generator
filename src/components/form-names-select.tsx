import { Select } from "@mantine/core";
import { useMemo } from "react";
import {useForms, useSelectedForm, useSelectForm} from "@contexts/selected-form-context";

const FormNamesSelect = () => {
    const {forms, isLoading} = useForms()
    const selectedForm = useSelectedForm();
    const {selectForm} = useSelectForm()

    const formattedData = useMemo(() => {
        if (isLoading || forms == null) return [
            {
                value: selectedForm?.selectedId,
                label: selectedForm?.selectedName
            }
        ];
        return forms.map(({_id, formName}: {_id: string, formName: string}) => ({
            value: _id,
            label: formName
        }))
    }, [selectedForm, forms, isLoading])

    const onChange = (newId: string) => {
        const match = forms.find(({_id}: {_id: string}) => _id === newId);
        if (match == null) {
            throw new Error('Form doesnt exist')
        }
        selectForm({
            selectedName: match.formName,
            selectedId: newId
        })
    }

    return <Select onChange={onChange} value={selectedForm?.selectedId} disabled={isLoading} data={formattedData}/>
}

export default FormNamesSelect
