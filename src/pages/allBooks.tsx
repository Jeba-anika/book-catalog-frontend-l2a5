import BookCard from "@/components/bookCard"
import { Button } from "@/components/ui/button"
import { useGetAllBooksQuery, useLazyGetAllBooksQuery, useLazyGetFilteredBooksQuery, useLazySearchBooksQuery } from "@/redux/features/book/bookApi"
import { useAppSelector } from "@/redux/hook"
import { IBook } from "@/types/globalTypes"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Loader from "@/components/loader"


export default function AllBooks() {
    const [allBooks, setAllBooks] = useState<any>({})
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const { data, isLoading } = useGetAllBooksQuery(undefined, { refetchOnMountOrArgChange: true })
    useEffect(() => {
        setAllBooks(data)
    }, [data])
    const { email } = useAppSelector(state => state.user)
    const [searchBooks, { isLoading: isSearchBookLoading }] = useLazySearchBooksQuery()
    const [getAllBooks, { isLoading: isGetAllBooksLoading }] = useLazyGetAllBooksQuery()
    const [getFilteredBooks, { isLoading: isGetFilteredBooksLoading }] = useLazyGetFilteredBooksQuery()
    const handleSearchBooks = async (data: any) => {
        console.log(data)
        const result = await searchBooks(data)
        setAllBooks(result?.data)

    }
    const handleGetAllBooks = async () => {
        console.log(data)
        const result = await getAllBooks(undefined)
        setAllBooks(result?.data)
        setValue('search', '')

    }


    const handleFilterBooks = async (data: any) => {
        console.log(data)
        const options = {
            genre: data.genre,
            publicationDate: data.publicationYear
        }
        const result = await getFilteredBooks(options)
        console.log(result?.data?.data)
        setAllBooks(result?.data)
    }

    return (
        <>{
            (isLoading || isSearchBookLoading || isGetAllBooksLoading || isGetFilteredBooksLoading) ? <div className="w-full h-full flex justify-center items-center"><Loader></Loader></div> :
                <div className="flex flex-col md:flex-row  justify-around gap-4">
                    <div className="border rounded-lg p-6 h-fit">
                        <Button className="w-full mb-4" onClick={handleGetAllBooks}>Show All Books</Button>
                        {
                            email && <Button className="w-full mb-4"><Link to='/addBook'>Add Book</Link></Button>
                        }
                        <form onSubmit={handleSubmit(handleSearchBooks)} className="mb-4">
                            <Input type="text" {...register('search')}></Input><Button className="mt-4 " type="submit">Search</Button>
                        </form>
                        <form onSubmit={handleSubmit(handleFilterBooks)}>
                            <p>Enter Genre</p>
                            <Input type="text" placeholder="mystery" {...register('genre')}></Input>
                            <br></br>
                            <p>Enter publication year</p>
                            <Input type="text" placeholder="1 Jan 2022" {...register('publicationYear')}></Input>
                            <Button className="mt-4 " type="submit">Search</Button>
                        </form>
                    </div>
                    <div className=" grid xl:grid-cols-2 gap-4">
                        {
                            allBooks?.data?.map((book: IBook) => <BookCard book={book} isHomePage={false} handleFinishedReading={undefined}></BookCard>)
                        }
                    </div>
                </div>
        }</>
    )
}
