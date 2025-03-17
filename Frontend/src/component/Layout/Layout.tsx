import { Outlet } from "react-router-dom";
import Header from "../Header";




const Layout = () => {
    return (
        <>
            <Header v2={null} />
            <Outlet />
        </>
    );
};

export default Layout;