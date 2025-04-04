

import { useAuth } from '@src/providers/AuthProvider.context';
import React from 'react'
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();
    const location = useLocation();

    console.log("user f protected", user);


    if (user === undefined) return <div>Loading...</div>
    if (user === null) return <div>Unauthorized</div>
    return <>{children}</>

}

export default ProtectedRoute;