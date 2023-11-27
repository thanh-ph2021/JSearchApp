import { useState, useEffect } from 'react'
import axios from 'axios'
import { JobResponseModel } from '../models/JobResponseModel'
import { EstimatedSalaryDataExample, JobDetailData, SearchData } from '../utils/data'

interface QueryModel {
    query?: string | string[],
    page?: string,
    num_pages?: string,
    job_id?: string | string[],
    job_title?: string,
    job_titles?: string,
    location?: string,
    radius?: number
}

const useFetch = (endpoint: string, query: QueryModel) => {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            // 'X-RapidAPI-Key': 'aa85b7cd97msh7add43a6904eddep154c6djsn2653315b39a0',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query, page: '1' },
    };
    
    const fetchData = async (params?: any) => {
        setIsLoading(true)

        // example data
        switch (endpoint) {
            case 'search':
                setData(SearchData)
                break;
            case 'job-details':
                setData(JobDetailData)
                break;
            case 'search-filters':
                setData(SearchData)
                break;
            case 'estimated-salary':
                setData(EstimatedSalaryDataExample)
                break;
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)


        // try {
        //     const response = await axios.request(params ? { ...options, params: endpoint == 'estimated-salary' ? params : { ...options.params, ...params } } : options)
        //     setData(response.data.data)
        //     setIsLoading(false)
        // } catch (error: any) {
        //     setError(error)
        // } finally {
        //     setIsLoading(false)
        // }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch, fetchData }
}

export default useFetch