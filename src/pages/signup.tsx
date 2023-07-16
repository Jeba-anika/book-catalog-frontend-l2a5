import { SignupForm } from '../components/signupForm';
import { Link } from 'react-router-dom';
export default function Signup() {
    return (
        <>
            {/* <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"> */}
            <div className='h-screen p-4'>


                <div className="lg:p-8  flex justify-center items-center">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center ">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <SignupForm />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>


                        <div className='w-full flex justify-center'>
                            <Link
                                to="/signin"
                                className=" hover:bg-black border border-black py-2 px-4 rounded hover:text-white w-fit text-center"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
