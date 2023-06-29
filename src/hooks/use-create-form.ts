import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

const useCreateForm = () => {
    return useMutation({
        mutationFn: (formName: string) => {
            return axios.post('/api/form', {
                formName
            })
        }
    })
}

export default useCreateForm;
