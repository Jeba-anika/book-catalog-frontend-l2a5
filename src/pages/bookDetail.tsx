import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useDeleteBookMutation, useGetBookDetailQuery } from '@/redux/features/book/bookApi'

import { Link, useParams } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog';
import BookCard from '@/components/bookCard';

export default function BookDetail() {
    const { id } = useParams()
    const { data } = useGetBookDetailQuery(id)
    const [deleteBook, { isLoading }] = useDeleteBookMutation()
    const handleDeleteBook = async () => {
        const result = await deleteBook(id)
        console.log(result)

    }
    return (
        <div>
            <div className='w-2/3 mx-auto'>
                <BookCard book={data?.data}></BookCard>
                {/* <h1 className='text-2xl'>Title : {data?.data?.title}</h1>
                <h1 className='text-2xl'>{data?.data?.author}</h1>
                <h1 className='text-2xl'>{data?.data?.genre}</h1>
                <h1 className='text-2xl'>{data?.data?.publicationDate}</h1> */}
                {
                    data?.data?.reviews.map(review => <h1>{review}</h1>)
                }
                {
                    data?.data?.owner.email === localStorage.getItem("email") && <>
                        <div className='flex gap-4 justify-end mt-6'>
                            <Button asChild cla><Link to={`/editBook/${id}`}>Edit Book</Link></Button>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Delete Book</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Are you sure you want to delete the following book?</DialogTitle>
                                        <DialogDescription>
                                            <p>Title: {data?.data?.title}</p>
                                            <p>Author: {data?.data?.author}</p>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild><Button onClick={handleDeleteBook} type="submit">Delete Book</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
