import { FC, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

type AuthorizedProps = {
    children: ReactNode,
    roles: ("ADMIN" | "USER")[]
}

const Authorized: FC<AuthorizedProps> = ({ children, roles }) => {
    const { auth } = useAuth();

    if (!auth) return null;

    const i = roles.length;
    let isAuth = false;
    for (let j = 0; j < i; j++) {
        if (roles[j] === auth.data.role) {
            isAuth = true;
        }
    }

    if (!isAuth) return null;
    return <>{children}</>;
}

export default Authorized;
