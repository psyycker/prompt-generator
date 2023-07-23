import {createStyles, Modal, TextInput, Button, Text} from "@mantine/core";
import useCreateForm from "@hooks/use-create-form";

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
    const {classes} = useStyles()
    const {formName, setFormName, submit, exists, isLoading} = useCreateForm(() => {
        close()
    })

    return (
        <Modal size="auto" centered opened={opened} onClose={close} title="Create a new form" xOffset={0}>
            <TextInput placeholder="Form name" className={classes.input} value={formName} onChange={setFormName}/>
            {exists && <Text color="red">Form name must be unique</Text>}
            <Button color="gray" disabled={formName === '' || exists || isLoading} className={classes.button} onClick={submit}>Create Form</Button>
        </Modal>
    )
}

export default CreateFormModal;
