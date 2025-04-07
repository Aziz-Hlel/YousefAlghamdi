

import { useAuth } from '@src/providers/AuthProvider.context';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    console.log("user f protected", user);

    useEffect(() => {
        if (user === null) {
            navigate("/login", { state: { from: location.pathname } });
        }
    }, [user, navigate, location]);


    if (user === undefined) return <div>Loading...</div>


    if (user === null) return null

    return <>{children}</>

}

export default ProtectedRoute;