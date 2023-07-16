import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SignupForm } from '../components/signupForm';
import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/loginForm';
// import logo from '../assets/images/technet-logo-white.png';

export default function SignIn() {
    return (
        <>
            {/* <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"> */}
            <div className='h-screen p-4'>


                <div className="lg:p-8  flex justify-center items-center">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center ">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                LogIn
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to LogIn
                            </p>
                        </div>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </>
    );
}
