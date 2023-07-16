/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditBookMutation, useGetBookDetailQuery } from "@/redux/features/book/bookApi"
import { IBookInput } from "@/types/globalTypes";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useEffect } from 'react'

export default function EditBook() {
    const { id } = useParams()
    const { data } = useGetBookDetailQuery(id as any)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<any>();

    useEffect(() => {
        setValue("title", data?.data?.title, { shouldDirty: true, shouldTouch: true })
        setValue("genre", data?.data?.genre)
        setValue("author", data?.data?.author)
        setValue("publicationDate", data?.data?.publicationDate)
    }, [id, data, setValue])

    const [editBook] = useEditBookMutation()

    const onSubmit = async (data: IBookInput) => {
        const options = {
            id,
            data
        }
        console.log(options)
        const result = await editBook(options)
        console.log(result)
    };
    return (
        <div >
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <div className="grid gap-10">
                    <div className="grid gap-6">
                        <Label className="" >
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
                        {errors.title && <p>{errors?.title?.message as string}</p>}
                        <Label className="" >
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
                        {errors.publicationDate && <p>{errors.publicationDate.message as string}</p>}
                        <Label className="" >
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
                        {errors.author && <p>{errors.author.message as string}</p>}
                        <Label className="" >
                            Author
                        </Label>
                        <Input
                            id="author"
                            placeholder="Mystery"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('author', { required: 'author is required' })}
                        />
                        {errors.genre && <p>{errors.author.message as string}</p>}


                    </div>
                    <Button>Edit Book</Button>
                </div>
            </form>
        </div>
    )
}
