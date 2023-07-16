import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useDeleteBookMutation, useGetBookDetailQuery } from '@/redux/features/book/bookApi'

import { Link, useParams } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog';
import BookCard from '@/components/bookCard';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function BookDetail() {
    const [inputValue, setInputValue] = useState<string>('');
    const { id } = useParams()
    const { data } = useGetBookDetailQuery(id)
    const [deleteBook, { isLoading }] = useDeleteBookMutation()
    const handleDeleteBook = async () => {
        const result = await deleteBook(id)
        console.log(result)

    }
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputValue);

        // const options = {
        //     id: id,
        //     data: { comment: inputValue },
        // };

        // postComment(options);
        // setInputValue('');
    };
    return (
        <div>
            <div className='w-2/3 mx-auto'>
                <BookCard book={data?.data}></BookCard>
                {
                    data?.data?.reviews.map(review => <h1>{review}</h1>)
                }
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
                <h1>Leave a review</h1>
                <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
                    <Textarea
                        className="min-h-[30px]"
                        onChange={handleChange}
                        value={inputValue}
                    />
                    <Button
                        type="submit"
                        className="rounded-full h-10 w-10 p-2 text-[25px]"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}
