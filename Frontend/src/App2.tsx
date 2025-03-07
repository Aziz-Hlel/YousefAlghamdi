import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react'
import Home from './component/Home'
import PaymentMethod from "./component/PaymentMethod";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./component/About";
import AddProperty from "./component/AddProperty";
import AgentDetail from "./component/AgentDetail";
import Contact from "./component/Contact";
import Dashboard from "./component/Dashboard";
import EditProperty from "./component/Edit Property";
import ErrorPage from "./component/Error";
import Faq from "./component/Faq";
import Login from "./component/Login";
import News from "./component/News";
import NewsSingle from "./component/NewsSingle.jsx";
import OurAgents from "./component/OurAgents";
import Pricing from "./component/Pricing.jsx";
import PropertySingle from "./component/Property Single";
import SignUp from "./component/SignUp";
import SubmitProperty from "./component/SubmitProperty";
import Property from "./component/Property";

const App2 = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/property",
            element: <Property />,
        },
        {
            path: "/property-single",
            element: <PropertySingle />,
        },
        {
            path: "/edit-property",
            element: <EditProperty />,
        },
        {
            path: "/add-property",
            element: <AddProperty />,
        },
        {
            path: "/submit-property",
            element: <SubmitProperty />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/blog-single",
            element: <NewsSingle />,
        },
        {
            path: "/blog",
            element: <News />,
        },
        {
            path: "/agent-detail",
            element: <AgentDetail />,
        },
        {
            path: "/our-agent",
            element: <OurAgents />,
        },
        {
            path: "/about",
            element: <AboutUs />,
        },
        {
            path: "/pricing",
            element: <Pricing />,
        },
        {
            path: "/payment-method",
            element: <PaymentMethod />,
        },
        {
            path: "/faq",
            element: <Faq />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/404",
            element: <ErrorPage />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />{" "}
        </>
    )
}

export default App2;