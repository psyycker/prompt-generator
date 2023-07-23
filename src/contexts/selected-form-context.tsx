import React, {createContext, useContext, useEffect, useState} from "react";
import {getValue, setValue} from "@utils/local-storage";
import useFormNames from "@hooks/use-form-names";
import {getAppConfig, saveAppConfig} from "@utils/fs-utils";

interface ISelectedForm {
    selectedId: string;
    selectedName: string;
}

interface ISelectForm {
    selectForm: (newValue: string, forceRefresh?: boolean) => void
}

type Form = {
    _id: string;
    formName: string;
}

interface IForms {
    forms: string[],
    isLoading: boolean
}

const SelectedFormContext = createContext<string>('')

const SelectFormContext = createContext<ISelectForm>({
    selectForm: (newValue) => {}
})

const FormsContext = createContext<IForms>({
    forms: [],
    isLoading: true
})

type Props = {
    children: React.ReactNode
}

const SelectedFormProvider = ({children}: Props) => {
    const {formNames, isLoading, refresh} = useFormNames()
    const [selectedForm, setSelectedForm] = useState<string>('');

    useEffect(() => {
        getAppConfig().then(config => {
            setSelectedForm(config.selectedForm || '')
        })
    }, [])

    const selectForm = async (newValue: string, reload = false) => {
        if (reload) {
            await refresh()
        }
        setSelectedForm(newValue);
        const appConfig = await getAppConfig();
        appConfig.selectedForm = newValue;
        await saveAppConfig(appConfig)
    }

    return (
        <FormsContext.Provider value={{
            forms: formNames,
            isLoading
        }}>
            <SelectFormContext.Provider value={{selectForm}}>
                <SelectedFormContext.Provider value={selectedForm}>
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
