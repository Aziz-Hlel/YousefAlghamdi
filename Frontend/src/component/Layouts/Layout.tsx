import Footer from "@src/component/Footer";
import Header from "@src/component/Header2";
import { Outlet } from "react-router-dom";




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