
export interface Category {
    name: string;
    items: FormItem[]
}

export type FormItem = {
    label: string;
    id: string;
    enabled: boolean;
    prompt: string;
}

export interface FormContent {
    categories: Category[]
}

export interface IForm {
    content: FormContent
}
