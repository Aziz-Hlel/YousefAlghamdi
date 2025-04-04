

import { useAuth } from '@src/providers/AuthProvider.context';
import React from 'react'
import { useLocation } from 'react-router-dom';

const protectedRoute = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();
    const location = useLocation();



    if (user === undefined) return <div>Loading...</div>
    if (user === null) return <div>Unauthorized</div>

    return <>{children}</>
    
}

export default protectedRoute