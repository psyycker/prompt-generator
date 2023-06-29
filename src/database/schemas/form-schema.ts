import mongoose, { Document } from 'mongoose';

interface IForm extends Document {
    formName: string;
    formContent: Record<string, unknown>
}

const formSchema = new mongoose.Schema<IForm>({
    formName: {
        type: String,
        required: true,
    },
    formContent: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
});

const Form = mongoose.models.Form || mongoose.model<IForm>('Form', formSchema);

export default Form
