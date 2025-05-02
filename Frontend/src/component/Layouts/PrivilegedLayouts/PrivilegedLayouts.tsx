import PrivilegedRoute from "@src/protectedRoute/PrivilegedRoute"
import  { RoleType } from "@src/types/roles.type"
import { Outlet } from "react-router-dom"



const PrivilegedLayouts = ({ authorizedRoles }: { authorizedRoles: RoleType | RoleType[] }) => {


    




    return (
        <>
            <PrivilegedRoute authorizedRoles={authorizedRoles}>
                <Outlet />
            </PrivilegedRoute>
        </>
    )


}


export default PrivilegedLayouts