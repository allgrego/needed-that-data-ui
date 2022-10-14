import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { nationalityOptions } from "../../utils/cid";
import { fetchPersonData } from "../../utils/cne";
import { PersonDataCne } from "../../utils/cne.types";


const useCidSearcher = () => {
    const defaultNationality = nationalityOptions[0].code || 'V'

    const [enableFetch, setEnableFetch] = useState<boolean>(false)
    const [nationality, setNationality] = useState<string>(defaultNationality)
    const [number, setNumber] = useState<string>('')


    const query = useQuery(['cnePersonData', enableFetch], async () => {
        const personData = await fetchPersonData(nationality, number)
        if (!personData) throw new Error("No person data...")
        return personData
    }, {
        initialData: null,
        retry: false,
        cacheTime: 100000,
        retryDelay: 500,
        enabled: true,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const { data, isLoading: queryIsLoading, ...restQuery } = query

    const personData: PersonDataCne | null = query.isError ? null : data

    const isLoading = query.isLoading || query.isFetching || query.isRefetching


    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setNumber(newValue)
    }

    const onSubmit = () => {
        setEnableFetch(true)
        query.refetch()
    }

    return {
        nationality, setNationality,
        number, setNumber, onChangeNumber,
        onSubmit,
        personData, isLoading,

        ...restQuery
    };
}

export default useCidSearcher;