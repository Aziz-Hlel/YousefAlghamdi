import AOS from "aos";
// import "aos/dist/aos.css";
import React, { useEffect } from 'react'
import Home from './component/Home/'
import PaymentMethod from "./component/PaymentMethod";
import { createBrowserRouter, Route, BrowserRouter as Router, RouterProvider, Routes, useParams } from "react-router-dom";
import AboutUs from "./component/About";
import AddProperty from "./component/AddProperty2";
import AgentDetail from "./component/AgentDetail";
import Contact from "./component/Contact2";
import Dashboard from "./component/Dashboard2";
import EditProperty from "./component/Edit Property2";
import ErrorPage from "./component/Error";
import Faq from "./component/Faq";
import Login from "./component/Login2";
import OurAgents from "./component/OurAgents";
import Pricing from "./component/Pricing.jsx";
import PropertySingle from "./component/Property Single2";
import SignUp from "./component/SignUp2";
import SubmitProperty from "./component/SubmitProperty2";
import Property from "./component/Property2/";
import Header from "./component/Header/index.jsx";
import HomecHero from "./component/HomecHero2/index.jsx";
import Layout from "./component/Layouts/Layout.js";
import { AuthProvider } from "./providers/AuthProvider.context.js";
import ProtectedLayouts from "./component/Layouts/ProtectedLayouts.js";
import MyProperties from "./component/Dashboard2/MyProperties/MyProperties2.js";
import PersonalInfo from "./component/Dashboard2/PersonalInfo2.js";
import Reviews from "./component/Dashboard2/Reviews2.js";
import DashboardComp from "./component/Dashboard2/DashboardComp2.js";
import ChangePassword from "./component/Dashboard2/ChangePassword2.js";
import MyPropertiesProvider from "./component/Dashboard2/MyProperties/MyPropertiesProvider.context.js";
import AgentsTable from "./component/Dashboard2/InvoiceTable2.js";
import { AgentsProvider } from "./providers/AgentsProvider.context.js";
import CU_Agent from "./component/Modal2/updatePersonalInfo.js";
import UserView from "./component/Modal2/index.js";

const App2 = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <AuthProvider>
                <AgentsProvider>

                    {/* <RouterProvider router={router} />{" "} */}
                    <Router>
                        <Routes>


                            <Route element={<Layout />} >

                                <Route path="" element={<Home />} />
                                <Route path="home" element={<Home />} />
                                <Route path="property/:city" element={<Property />} />
                                <Route path="property" element={<Property />} />


                                <Route path="property-single/:propertyId" element={<PropertySingle />} />


                                <Route path="agent-detail" element={<AgentDetail />} />
                                {/* <Route path="our-agents" element={<OurAgents />} /> */}
                                {/* <Route path="about" element={<AboutUs />} /> */}
                                {/* <Route path="/pricing" element={<Pricing />} /> */}
                                {/* <Route path="/payment-method" element={<PaymentMethod />} /> */}
                                <Route path="faq" element={<Faq />} />
                                <Route path="contact" element={<Contact />} />

                                <Route element={<ProtectedLayouts />}>

                                    {/* <Route path="edit-property" element={<EditProperty />} /> */}
                                    <Route path="add-property" element={<AddProperty />} />
                                    <Route path="submit-property/:whatFor" element={<SubmitProperty />} />
                                    {/* <Route path="edit-property/:whatFor/:propertyId" element={<SinglePropertyProvider ><SubmitProperty /></SinglePropertyProvider>} /> */}


                                    <Route path="dashboard" element={<Dashboard />} >

                                        <Route index element={<DashboardComp />} />
                                        <Route path="my-properties" element={<MyPropertiesProvider> <MyProperties title="My properties" /> </MyPropertiesProvider>} />
                                        <Route path="personal-info" element={<PersonalInfo />} />
                                        <Route path="Reviews" element={<Reviews />} />
                                        <Route path="change-password" element={<ChangePassword />} />


                                        {/* Admin Routes */}
                                        <Route path="pending-properties" element={<MyPropertiesProvider> <MyProperties title="Pending Properties" /> </MyPropertiesProvider>} >
                                            <Route path="inspect-user/:userId" element={<UserView />} />
                                        </Route>

                                        <Route path="agents" element={<AgentsTable />} >
                                            <Route path="add-agent" element={<CU_Agent />} />
                                            <Route path="edit-agent/:agentId" element={<CU_Agent />} />
                                        </Route>
                                        {/* <Route path="add-agent" element={<UpdatePersonalInfo isModalOpen={true} toggleModal={() => { }} />}></Route> */}

                                    </Route>
                                    <Route path="dashboard/my-properties/edit-property/:propertyId" element={<EditProperty />} />
                                    <Route path="dashboard/pending-properties/edit-property/:propertyId" element={<EditProperty />} />




                                </Route>

                                <Route path="*" element={<ErrorPage />} />

                            </Route>

                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />


                        </Routes>
                    </Router>

                </AgentsProvider>
            </AuthProvider >
        </>
    )
}

export default App2;