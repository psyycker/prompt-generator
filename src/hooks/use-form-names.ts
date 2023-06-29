import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useFormNames = () => {
    const fetchForms = () => {
        return axios.get('/api/forms')
    }

    return useQuery({queryKey: ['formNames'], queryFn: fetchForms})
}

export default useFormNames
