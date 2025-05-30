import { useAuth } from '@src/providers/AuthProvider.context';
import { RoleType } from '@src/types/roles.type'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorPage from '@src/component/Error';


const PrivilegedRoute = ({ children, authorizedRoles }: { children: React.ReactNode, authorizedRoles: RoleType | RoleType[] }) => {


    const { user } = useAuth();
    const navigate = useNavigate();

    if (user === undefined) return <div>Loading...</div>
    if (!user) navigate("/login", { state: { from: location.pathname } });
    // ! change the notfound page to a forbidden one
    if (user && !authorizedRoles.includes((user.role as any))) return <ErrorPage />



    return <>{children}</>
}

export default PrivilegedRoute