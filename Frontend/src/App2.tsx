import AOS from "aos";
// import "aos/dist/aos.css";
import React, { useEffect } from 'react'
import Home from './component/Home'
import PaymentMethod from "./component/PaymentMethod";
import { createBrowserRouter, Route, BrowserRouter as Router, RouterProvider, Routes } from "react-router-dom";
import AboutUs from "./component/About";
import AddProperty from "./component/AddProperty";
import AgentDetail from "./component/AgentDetail";
import Contact from "./component/Contact";
import Dashboard from "./component/Dashboard";
import EditProperty from "./component/Edit Property";
import ErrorPage from "./component/Error";
import Faq from "./component/Faq";
import Login from "./component/Login2";
import OurAgents from "./component/OurAgents";
import Pricing from "./component/Pricing.jsx";
import PropertySingle from "./component/Property Single2";
import SignUp from "./component/SignUp2";
import SubmitProperty from "./component/SubmitProperty";
import Property from "./component/Property2/";

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
            path: "/property-single/:id",
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
            {/* <RouterProvider router={router} />{" "} */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/home" element={<Home />} /> */}
                    <Route path="/property" element={<Property />} />
                    {/* <Route path="/property/:city" element={<Property />} /> */}
                    <Route path="/property-single/:id" element={<PropertySingle />} />
                    <Route path="/edit-property" element={<EditProperty />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    <Route path="/submit-property" element={<SubmitProperty />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/agent-detail" element={<AgentDetail />} />
                    <Route path="/our-agent" element={<OurAgents />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/payment-method" element={<PaymentMethod />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/contact" element={<Contact />} />



                </Routes>
            </Router>
        </>
    )
}

export default App2;