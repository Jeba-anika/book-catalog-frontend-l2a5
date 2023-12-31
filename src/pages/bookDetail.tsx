import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAddReviewMutation, useDeleteBookMutation, useGetBookDetailQuery } from '@/redux/features/book/bookApi'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog';
import BookCard from '@/components/bookCard';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import Loader from '@/components/loader';

export default function BookDetail() {
    const [inputValue, setInputValue] = useState<string>('');
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useGetBookDetailQuery(id as any)
    const [deleteBook] = useDeleteBookMutation()
    const [addReview] = useAddReviewMutation()
    const handleDeleteBook = async () => {
        const result: any = await deleteBook(id)
        try {
            if (result?.data.statusCode === 200) {
                toast({
                    description: result.data.message
                })
            }
            navigate('/allBooks')

        } catch (err) {
            toast({
                description: 'Some error occurred'
            })
        }

    }
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputValue);

        const options = {
            id: id,
            data: { review: inputValue },
        };
        try {
            const result: any = await addReview(options)
            if (result.data.statusCode === 200) {
                toast({
                    description: result.data.message
                })
            }
            refetch()
            setInputValue('');

        } catch (err) {
            toast({
                description: 'Some error occurred'
            })
        }
    };

    return (
        <div>
            {
                isLoading ? <div className='w-full h-full flex justify-center'><Loader></Loader></div> : <div className='sm:w-2/3 mx-auto'>
                    <BookCard book={data?.data} handleFinishedReading={undefined}></BookCard>

                    {
                        data?.data?.owner.email === localStorage.getItem("email") && <>
                            <div className='flex gap-4 justify-end mt-6'>
                                <Button asChild ><Link to={`/editBook/${id}`}>Edit Book</Link></Button>

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
                    <h1 className='mt-4'>Leave a review</h1>
                    <form className="flex gap-5 items-center mb-8" onSubmit={handleSubmit}>
                        <Textarea
                            className="min-h-[30px]"
                            onChange={handleChange}
                            value={inputValue}
                        />
                        <Button
                            type="submit"
                        >
                            Send
                        </Button>
                    </form>
                    {
                        data?.data?.reviews.length > 0 && <>
                            <h1 className='mb-2'>Reviews</h1>
                            <div className='flex flex-col gap-4'>
                                {
                                    data?.data?.reviews.map(review => <h1 className=' shadow  px-4 py-2'>{review}</h1>)
                                }
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}
