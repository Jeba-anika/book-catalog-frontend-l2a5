import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useAddToWishlistMutation } from "@/redux/features/book/bookApi"
import { toast } from "./ui/use-toast"

export default function BookCard({ book, isHomePage = true }) {
    const [addToWishlist, { isLoading }] = useAddToWishlistMutation()
    const handleAddToWishlist = async () => {
        console.log(book._id)
        const result = await addToWishlist(book._id)
        if (result.data.statusCode === 200) {
            toast({
                description: result.data.message
            })
        }
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle>{book?.title}</CardTitle>
                <CardDescription>{book?.genre}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Author: {book?.author}</p>
                <p>Publication Date: {book?.publicationDate}</p>
            </CardContent>
            {
                !isHomePage && <CardFooter>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link to={`/book/${book._id}`}>See Details</Link>
                        </Button>
                        <Button onClick={handleAddToWishlist}>
                            Add to wishlist
                        </Button>
                        <Button >
                            Plan to read soon
                        </Button>
                    </div>
                </CardFooter>
            }

        </Card>


    )
}
