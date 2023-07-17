import BookCard from "@/components/bookCard";
import Loader from "@/components/loader";
import { useGetTopBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/globalTypes";

export default function Home() {
    const { data, isLoading } = useGetTopBooksQuery<any>(undefined, { refetchOnMountOrArgChange: true })
    return (
        <>
            {
                !isLoading ? <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        data?.data?.map((book: IBook) => <BookCard book={book} handleFinishedReading={undefined}></BookCard>)
                    }

                </div> :
                    <div className="w-full h-full flex justify-center"><Loader></Loader>
                    </div>
            }
        </>
    )
}
