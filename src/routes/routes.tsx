import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "@/pages/signup";
import SignIn from "@/pages/signin";
import Home from "@/pages/home";
import AllBooks from "@/pages/allBooks";
import BookDetail from "@/pages/bookDetail";
import AddBook from "@/pages/addBook";
import EditBook from "@/pages/editBook";
import Wishlist from "@/pages/wishlist";
import CurrentlyReading from "@/pages/currentlyReading";
import PrivateRoute from "./privateRoute";

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
            },
            {
                path: '/book/:id',
                element: <BookDetail></BookDetail>
            },
            {
                path: '/addBook',
                element: <PrivateRoute><AddBook></AddBook></PrivateRoute>
            },
            {
                path: '/editBook/:id',
                element: <PrivateRoute><EditBook></EditBook></PrivateRoute>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: '/currentlyReading',
                element: <PrivateRoute><CurrentlyReading></CurrentlyReading></PrivateRoute>
            }
        ]
    }
])
export default routes