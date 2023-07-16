import BookCard from "@/components/bookCard"
import { useGetUserQuery } from "@/redux/features/user/userApi"

export default function Wishlist() {
    const { data } = useGetUserQuery(undefined)
    console.log(data)
    return (
        <div>
            {
                data?.data?.wishlist?.map(book => <BookCard book={book}></BookCard>)
            }
        </div>
    )
}
