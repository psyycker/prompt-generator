import {useSelectedForm} from "@contexts/selected-form-context";
import useForm from "@hooks/use-form";

export type TYPE = 'Category' | 'Checkbox' | string

const useFormEdition = () => {
    const selectedForm = useSelectedForm();
    const {form, isLoading} = useForm(selectedForm)

    const createItem = (type: TYPE) => {

    }

    return {
        createItem,
        form,
        isLoading
    }
}

export default useFormEdition;
