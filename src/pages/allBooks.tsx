import BookCard from "@/components/bookCard"
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi"
import { IBook } from "@/types/globalTypes"

export default function AllBooks() {
    const { data, isLoading, error } = useGetAllBooksQuery(undefined)
    console.log(data)
    return (
        <div className=" grid grid-cols-4 gap-4">
            {
                data?.data?.map((book: IBook) => <BookCard book={book}></BookCard>)
            }
        </div>
    )
}
