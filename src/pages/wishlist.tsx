import BookCard from "@/components/bookCard"
import { useGetUserQuery } from "@/redux/features/user/userApi"

export default function Wishlist() {
    const { data } = useGetUserQuery(undefined)
    console.log(data)
    return (
        <div className="grid grid-cols-2 gap-4">
            {
                data?.data?.wishlist?.map(book => <BookCard book={book} isFinishedReading={true}></BookCard>)
            }
        </div>
    )
}
