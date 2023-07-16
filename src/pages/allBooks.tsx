import BookCard from "@/components/bookCard"
import { Button } from "@/components/ui/button"
import { useGetAllBooksQuery, useLazySearchBooksQuery } from "@/redux/features/book/bookApi"
import { useAppSelector } from "@/redux/hook"
import { IBook } from "@/types/globalTypes"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"


interface SearchFormInputs {
    search: string;
}
export default function AllBooks() {
    const [allBooks, setAllBooks] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchFormInputs>();
    const { data, isLoading, error } = useGetAllBooksQuery(undefined)
    useEffect(() => {
        setAllBooks(data)
    }, [data])
    const { email } = useAppSelector(state => state.user)
    const [searchBooks, { isLoading: isSearchBookLoading }] = useLazySearchBooksQuery()
    const handleSearchBooks = async (data) => {
        console.log(data)
        const result = await searchBooks(data)
        setAllBooks(result?.data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleSearchBooks)}>
                <Input type="text" {...register('search')}></Input><Button type="submit">Search</Button>
            </form>
            {
                email && <Button><Link to='/addBook'>Add Book</Link></Button>
            }
            <div className=" grid grid-cols-4 gap-4 mt-4">
                {
                    allBooks?.data?.map((book: IBook) => <BookCard book={book} isHomePage={false}></BookCard>)
                }
            </div>
        </>
    )
}
