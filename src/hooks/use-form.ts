import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useMemo} from "react";

const useForm = (id: string | undefined) => {
    const fetchForm = (_id: string) => {
        return axios.get(`/api/form/${_id}`)
    }

    const {refetch, data, isLoading} = useQuery({ queryKey: ['form', id], queryFn: () => id ? fetchForm(id) : undefined, enabled: false,  })

    useEffect(() => {
        if (id != null) {
            refetch()
        }
    }, [id, isLoading])

    const dataFormatted = useMemo(() => {
        if (data?.data == null) return null;
        return data.data
    }, [data])

    return {
        isLoading,
        form: dataFormatted
    };
}

export default useForm;
