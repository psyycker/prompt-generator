import React, {createContext, useContext, useEffect, useState} from "react";
import {getValue, setValue} from "@utils/local-storage";
import useFormNames from "@hooks/use-form-names";

interface ISelectedForm {
    selectedId: string;
    selectedName: string;
}

interface ISelectForm {
    selectForm: (newValue: ISelectedForm) => void
}

type Form = {
    _id: string;
    formName: string;
}

interface IForms {
    forms: Form[],
    isLoading: boolean
}

const SelectedFormContext = createContext<ISelectedForm>({
    selectedName: '',
    selectedId: ''
})

const SelectFormContext = createContext<ISelectForm>({
    selectForm: (newValue) => {
    }
})

const FormsContext = createContext<IForms>({
    forms: [],
    isLoading: true
})

type Props = {
    children: React.ReactNode
}

const SelectedFormProvider = ({children}: Props) => {
    const {data, isLoading, refetch} = useFormNames()
    const [selectedValue, setSelectedValue] = useState<ISelectedForm>(getValue('SELECTED_FORM', {
        selectedId: '',
        selectedName: ''
    }))

    const selectForm = async (newValue: ISelectedForm, reload = false) => {
        if (reload) {
            await refetch()
        }
        setValue('SELECTED_FORM', newValue);
        setSelectedValue(newValue);
    }

    return (
        <FormsContext.Provider value={{
            forms: data?.data,
            isLoading
        }}>
            <SelectFormContext.Provider value={{selectForm}}>
                <SelectedFormContext.Provider value={selectedValue}>
                    {children}
                </SelectedFormContext.Provider>
            </SelectFormContext.Provider>
        </FormsContext.Provider>
    )
}

export const useSelectedForm = () => {
    return useContext(SelectedFormContext);
}

export const useSelectForm = () => {
    return useContext(SelectFormContext);
}

export const useForms = () => {
    return useContext(FormsContext)
}

export default SelectedFormProvider
