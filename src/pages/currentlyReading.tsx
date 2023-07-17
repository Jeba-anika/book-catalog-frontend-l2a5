import BookCard from "@/components/bookCard"
import { toast } from "@/components/ui/use-toast"
import { useFinishedReadingMutation } from "@/redux/features/book/bookApi"
import { useGetUserQuery } from "@/redux/features/user/userApi"

export default function CurrentlyReading() {
    const userId: string = localStorage.getItem("id")
    const { data, refetch } = useGetUserQuery(userId, { refetchOnMountOrArgChange: true })
    const [finishedReading] = useFinishedReadingMutation()
    const handleFinishedReading = async (id) => {

        const result: any = await finishedReading(id)
        console.log(result)
        if (result.data.statusCode === 200) {
            toast({
                description: result.data.message
            })
        }
        refetch()
    }
    console.log(data)
    return (
        <div className="grid grid-cols-2 gap-4">
            {
                data?.data?.currentlyReading?.map(book => <BookCard book={book} isFinishedReading={true} handleFinishedReading={handleFinishedReading}></BookCard>)
            }
        </div>
    )
}
