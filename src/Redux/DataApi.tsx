import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 export interface IData{
    data: {
        id: string;
        type: string;
        attributes: {
            coverImage: string;
            personalInformation: {
                firstName: {
                    internalUse: boolean;
                    show: boolean;
                },
                lastName: {
                    internalUse: boolean;
                    show: boolean;
                },
                emailId: {
                    internalUse: boolean;
                    show: boolean;
                },
                phoneNumber: {
                    internalUse: boolean;
                    show: boolean;
                },
                nationality: {
                    internalUse: boolean;
                    show: boolean;
                },
                currentResidence: {
                    internalUse: boolean;
                    show: boolean;
                },
                idNumber: {
                    internalUse: boolean;
                    show: boolean;
                },
                dateOfBirth: {
                    internalUse: boolean;
                    show: boolean;
                },
                gender: {
                    internalUse: boolean;
                    show: boolean;
                },
                personalQuestions: [{
                    id: string;
                    type: string;
                    question: string;
                    choices: string[];
                    maxChoice: number;
                    disqualify: boolean;
                    other: boolean;
                }]
            }
            profile: {
                education: {
                    mandatory: boolean;
                    show: boolean;
                },
                experience: {
                    mandatory: boolean;
                    show: boolean;
                },
                resume: {
                    mandatory: boolean;
                    show: boolean;
                },
                profileQuestions: [{
                    id: string;
                    type: string;
                    question: string;
                    choices: string[];
                    maxChoice: number;
                    disqualify: boolean;
                    other: boolean;
                }],
            }
            customisedQuestions: {
                id: string;
                type: string;
                question: string;
                choices: string[];
                maxChoice: number;
                disqualify: boolean;
                other:boolean
            }
        }
    }
}

export const ApiSlicer = createApi({
    reducerPath: 'ApiSlicer',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://stoplight.io/mocks/youssef3issa/interview-task/247910535/api/1.0/programs/y9lu1wqa4bc0w/application-form' }),
    tagTypes:['data'],
    endpoints: builder => ({
        getData: builder.query < IData, void>({
            query: () => '',
            providesTags:['data']
        }),
        updateData: builder.mutation<IData, Partial<IData>>({
            query: (data) => ({
                url: 'https://stoplight.io/mocks/youssef3issa/interview-task/247910535/api/1.0/programs/y9lu1wqa4bc0w/application-form',
                method: 'PUT',
                body:data
            }),
            invalidatesTags:['data']

        })
    })
})

export const {useGetDataQuery,useUpdateDataMutation} =ApiSlicer