import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect} from "react";

const useForm = (id: string | undefined) => {
    const fetchForm = (_id: string) => {
        return axios.get(`/api/form/${_id}`)
    }

    const {refetch, ...rest} = useQuery({ queryKey: ['form'], queryFn: () => id ? fetchForm(id) : undefined, enabled: false,  })

    useEffect(() => {
        if (id != null && !rest.isLoading) {
            refetch()
        }
    }, [id, rest.isLoading])

    return rest;
}

export default useForm;
