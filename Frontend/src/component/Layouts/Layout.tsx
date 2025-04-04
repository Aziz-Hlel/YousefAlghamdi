import { Outlet } from "react-router-dom";
import Header from "../Header2";
import Footer from "../Footer";




const Layout = () => {
    return (
        <>
            <Header v2={false} />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;