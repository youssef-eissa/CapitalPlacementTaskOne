import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IData{
    data: string;
    id: string;
    attributes: string;
    coverImage: string;

}

export const ApiSlicer = createApi({
    reducerPath: 'ApiSlicer',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://stoplight.io/mocks/youssef3issa/interview-task/247910535/api/1.0/programs/y9lu1wqa4bc0w/application-form' }),
    endpoints: builder => ({
        getData: builder.query<IData[],void>({
            query:()=>''
        })
    })
})

export const {useGetDataQuery} =ApiSlicer