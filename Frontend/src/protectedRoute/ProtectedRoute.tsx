

import { useAuth } from '@src/providers/AuthProvider.context';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    console.log("user f protected", user);


    if (user === undefined) return <div>Loading...</div>
    
    if (user === null) return <></>
    if (user === null) navigate("/login", { state: { from: location.pathname } })

    return <>{children}</>

}

export default ProtectedRoute;