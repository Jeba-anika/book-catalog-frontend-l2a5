import { useGetBookDetailQuery } from '@/redux/features/book/bookApi'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetail() {
    const { id } = useParams()
    const { data } = useGetBookDetailQuery(id)
    console.log(data?.data)
    return (
        <div>
            <h1>{data?.data?.title}</h1>
            <h1>{data?.data?.author}</h1>
            <h1>{data?.data?.genre}</h1>
            <h1>{data?.data?.publicationDate}</h1>
            {
                data?.data?.reviews.map(review => <h1>{review}</h1>)
            }
        </div>
    )
}
