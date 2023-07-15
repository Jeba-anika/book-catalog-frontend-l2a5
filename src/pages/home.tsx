import BookCard from "@/components/bookCard";
import { useGetTopBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/globalTypes";

export default function Home() {
    const { data, isLoading, error } = useGetTopBooksQuery(undefined)
    return (
        <div className=" grid grid-cols-4 gap-4">
            {
                data?.data?.map((book: IBook) => <BookCard book={book}></BookCard>)
            }
        </div>
    )
}
