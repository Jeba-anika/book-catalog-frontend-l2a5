'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react'
import { useUserLoginMutation } from '@/redux/features/user/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser } from '@/redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAddBookMutation } from '@/redux/features/book/bookApi';
// import { createUser } from '@/redux/features/user/userSlice';
// import { useAppDispatch } from '@/redux/hook';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface IBookInput {
    title: string;
    genre: string;
    publicationDate: string
    author: string
}


export default function AddBook({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBookInput>();


    const dispatch = useAppDispatch();
    const [addBook, { isLoading }] = useAddBookMutation()

    const onSubmit = async (data: IBookInput) => {
        const payload = { ...data, owner: localStorage.getItem("id") }
        const result = await addBook(payload)
        console.log(result)
    };


    return (
        <div className={cn('grid gap-6 mt-10', className)} {...props}>
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
