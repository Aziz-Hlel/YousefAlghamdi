import { Outlet } from "react-router-dom";
import Header from "../Header";




const Layout = () => {
    return (
        <>
            <Header v2={false} />
            <Outlet />
        </>
    );
};

export default Layout;