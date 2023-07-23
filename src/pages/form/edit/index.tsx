import Layout from "@layout";
import useForm from "@hooks/use-form";
import {useSelectedForm} from "@contexts/selected-form-context";
import useFormEdition from "./hooks/use-form-edition";
import MenuButton from "@components/menu-button";
import {Button} from "@mantine/core";

const EditFormPage = () => {
    const selectedForm = useSelectedForm();
    const {form, isLoading} = useForm(selectedForm?.selectedId)

    const {createItem, localForm} = useFormEdition(form, isLoading)

    return (
        <Layout>
            <Button onClick={() => createItem('Category')}>Add new category...</Button>
        </Layout>
    )
}

export default EditFormPage
