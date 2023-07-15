import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "@/pages/signup";
import SignIn from "@/pages/signin";
import Home from "@/pages/home";
import AllBooks from "@/pages/allBooks";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <Signup></Signup>

            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/allBooks',
                element: <AllBooks></AllBooks>
            }
        ]
    }
])
export default routes