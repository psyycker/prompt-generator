import {createStyles, Modal, TextInput, Button, Text} from "@mantine/core";
import useCreateForm from "@hooks/use-create-form";
import {useInputState} from "@mantine/hooks";
import {useEffect} from "react";
import {AxiosError} from "axios";
import {useRouter} from "next/router";
import {useSelectForm} from "@contexts/selected-form-context";

type Props = {
    opened: boolean,
    close: () => void
}

const useStyles = createStyles({
    input: {
        marginTop: 20
    },
    button: {
        marginTop: 20
    }
})

const CreateFormModal = ({opened, close}: Props) => {
    const { selectForm } = useSelectForm()
    const router = useRouter()
    const [formName, setFormName] = useInputState('');
    const {classes} = useStyles()
    const mutation = useCreateForm();

    useEffect(() => {
        if (mutation.isSuccess && mutation.data?.data) {
            selectForm({
                selectedId: mutation.data.data.id,
                selectedName: mutation.data.data.formName
            }, true)
            router.push(`/form/edit`)
            mutation.reset()
            setFormName('')
            close()
        }
    }, [mutation])

    const onCreateForm = () => {
        if (mutation.isLoading) return;
        mutation.mutate(formName);
    }

    return (
        <Modal size="auto" centered opened={opened} onClose={close} title="Create a new form" xOffset={0}>
            <TextInput placeholder="Form name" className={classes.input} value={formName} onChange={setFormName}/>
            {mutation.isError && <Text color="red" >{(mutation.error as AxiosError)?.response?.data as string}</Text>}
            <Button color="gray" className={classes.button} onClick={onCreateForm}>Create Form</Button>
        </Modal>
    )
}

export default CreateFormModal;
