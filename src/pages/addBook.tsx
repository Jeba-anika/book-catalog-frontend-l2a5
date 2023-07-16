'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAddBookMutation } from '@/redux/features/book/bookApi';
import { IBookInput } from '@/types/globalTypes';
import { toast } from '@/components/ui/use-toast';
// import { createUser } from '@/redux/features/user/userSlice';
// import { useAppDispatch } from '@/redux/hook';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;




export default function AddBook({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBookInput>();

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [addBook, { isLoading }] = useAddBookMutation()

    const onSubmit = async (data: IBookInput) => {
        const payload = { ...data, owner: localStorage.getItem("id") }
        try {
            const result = await addBook(payload)
            console.log(result)
            if (result?.data?.statusCode === 200) {
                toast({
                    description: 'Book added'
                })
                navigate('/allBooks')
            }
        } catch (err) {

            toast({
                description: err?.errorerrorMessages[0].message
            })
        }
    };


    return (
        <div className={cn('grid gap-8 mt-10 sm:w-2/3 mx-auto', className)} {...props}>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <div className="grid gap-10">
                    <div className="grid gap-6">
                        <Label className="" htmlFor="title">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="my-book"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                        <Label className="" htmlFor="publicationDate">
                            Genre
                        </Label>
                        <Input
                            id="publicationDate"
                            placeholder="1 Jan 1990"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('publicationDate', { required: 'Publication Date is required' })}
                        />
                        {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
                        <Label className="" htmlFor="author">
                            Author
                        </Label>
                        <Input
                            id="author"
                            placeholder="Mystery"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('author', { required: 'Author is required' })}
                        />
                        {errors.author && <p>{errors.author.message}</p>}
                        <Label className="" htmlFor="author">
                            Genre
                        </Label>
                        <Input
                            id="genre"
                            placeholder="Mystery"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('genre', { required: 'Genre is required' })}
                        />
                        {errors.genre && <p>{errors.genre.message}</p>}


                    </div>
                    <Button>Add Book</Button>
                </div>
            </form>


        </div>
    );
}
