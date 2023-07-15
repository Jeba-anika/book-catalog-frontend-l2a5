import BookCard from "@/components/bookCard"
import { Button } from "@/components/ui/button"
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi"
import { useAppSelector } from "@/redux/hook"
import { IBook } from "@/types/globalTypes"
import { Link } from "react-router-dom"

export default function AllBooks() {
    const { data, isLoading, error } = useGetAllBooksQuery(undefined)
    const { email } = useAppSelector(state => state.user)
    return (
        <>
            {
                email && <Button><Link to='/addBook'>Add Book</Link></Button>
            }
            <div className=" grid grid-cols-4 gap-4 mt-4">
                {
                    data?.data?.map((book: IBook) => <BookCard book={book} isHomePage={false}></BookCard>)
                }
            </div>
        </>
    )
}
