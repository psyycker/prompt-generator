import Layout from "@layout";
import useForm from "@hooks/use-form";
import {useSelectedForm} from "@contexts/selected-form-context";

const EditFormPage = () => {
    const selectedForm = useSelectedForm();
    const {data} = useForm(selectedForm?.selectedId)

    return <Layout>Yo</Layout>
}

export default EditFormPage
