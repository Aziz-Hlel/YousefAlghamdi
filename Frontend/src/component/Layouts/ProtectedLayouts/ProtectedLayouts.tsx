import ProtectedRoute from "@src/protectedRoute/ProtectedRoute"
import { Outlet } from "react-router-dom"


const ProtectedLayouts = () => {



    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}

export default ProtectedLayouts