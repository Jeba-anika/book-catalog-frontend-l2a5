import BookCard from "@/components/bookCard";
import { useGetTopBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/globalTypes";

export default function Home() {
    const { data } = useGetTopBooksQuery<any>(undefined)
    return (
        <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                data?.data?.map((book: IBook) => <BookCard book={book}></BookCard>)
            }
        </div>
    )
}
