'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useUserLoginMutation, useUserSignUpMutation } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
    email: string;
    password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>();
    const [signup] = useUserSignUpMutation()
    const [login] = useUserLoginMutation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onSubmit = async (data: SignupFormInputs) => {
        console.log(data);
        const payload = {
            ...data,
            role: 'user'
        }
        const result: any = await signup(payload)
        if (result?.data?.statusCode === 200) {
            const res: any = await login(data)
            console.log(res)
            dispatch(setUser(res?.data?.data))
            navigate('/')
        }
        // dispatch(createUser({ email: data.email, password: data.password }));
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <div className="grid gap-10">
                    <div className="grid gap-6">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <Input
                            id="password"
                            placeholder="your password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}

                    </div>
                    <Button>Create Account</Button>
                </div>
            </form>


        </div>
    );
}
