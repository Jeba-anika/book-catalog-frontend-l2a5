import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
    const { email } = useAppSelector((state) => state.user);

    const { pathname } = useLocation();

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    if (!email) {
        return <Navigate to="/signin" state={{ path: pathname }} />;
    }

    return children;
}
