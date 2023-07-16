import BookCard from "@/components/bookCard"
import { Button } from "@/components/ui/button"
import { useGetAllBooksQuery, useLazyGetAllBooksQuery, useLazySearchBooksQuery } from "@/redux/features/book/bookApi"
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
        setValue,
        formState: { errors },
    } = useForm<SearchFormInputs>();
    const { data, isLoading, error } = useGetAllBooksQuery(undefined)
    useEffect(() => {
        setAllBooks(data)
    }, [data])
    const { email } = useAppSelector(state => state.user)
    const [searchBooks, { isLoading: isSearchBookLoading }] = useLazySearchBooksQuery()
    const [getAllBooks, { isLoading: isGetAllBookLoading }] = useLazyGetAllBooksQuery()
    const handleSearchBooks = async (data) => {
        console.log(data)
        const result = await searchBooks(data)
        setAllBooks(result?.data)

    }
    const handleGetAllBooks = async () => {
        console.log(data)
        const result = await getAllBooks()
        setAllBooks(result?.data)
        setValue('search', '')
    }
    return (
        <div className="flex  justify-around ">
            <div className="border rounded-lg p-6 h-fit">
                <Button className="w-full mb-4" onClick={handleGetAllBooks}>Show All Books</Button>
                {
                    email && <Button className="w-full mb-4"><Link to='/addBook'>Add Book</Link></Button>
                }
                <form onSubmit={handleSubmit(handleSearchBooks)}>
                    <Input type="text" {...register('search')}></Input><Button className="mt-4 " type="submit">Search</Button>
                </form>
            </div>
            <div className=" grid grid-cols-3 gap-4">
                {
                    allBooks?.data?.map((book: IBook) => <BookCard book={book} isHomePage={false}></BookCard>)
                }
            </div>
        </div>
    )
}
