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

export default function BookCard({ book, isHomePage = true }) {
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
                    <Button asChild>
                        <Link to={`/book/${book._id}`}>See Details</Link>
                    </Button>
                </CardFooter>
            }

        </Card>


    )
}
