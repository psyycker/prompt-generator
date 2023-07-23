import Layout from "@layout";
import useFormEdition from "./hooks/use-form-edition";
import {Button} from "@mantine/core";

const EditFormPage = () => {
    const {createItem, form} = useFormEdition()

    if (form == null) {
        return <Layout>Nothing to see here. Start by creating a new form!</Layout>
    }

    return (
        <Layout>
            <Button onClick={() => createItem('Category')}>Add new category...</Button>
        </Layout>
    )
}

export default EditFormPage
