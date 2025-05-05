import AOS from "aos";
// import "aos/dist/aos.css";
import { useEffect } from 'react';
import Home from './component/Home/';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProperty from "./component/AddProperty2";
import AgentDetail from "./component/AgentDetail2";
import Contact from "./component/Contact2";
import Dashboard from "./component/Dashboard2";
import EditPendingProperty from "./component/EditPendingProperty/index.js";
import ErrorPage from "./component/Error";
import Faq from "./component/Faq";
import Login from "./component/Login2";
import SignUp from "./component/SignUp2";
import SubmitProperty from "./component/SubmitProperty2";
import Property from "./component/Property2/";
import { AuthProvider } from "./providers/AuthProvider.context.js";
import ProtectedLayouts from "./component/Layouts/ProtectedLayouts/ProtectedLayouts.js";
import MyProperties from "./component/Dashboard2/MyProperties/MyProperties2.js";
import PersonalInfo from "./component/Dashboard2/MyProperties/PersonalInfo2/PersonalInfo2.js";
import DashboardComp from "./component/Dashboard2/DashboardComp2.js";
import ChangePassword from "./component/Dashboard2/ChangePassword2.js";
import MyPropertiesProvider from "./component/Dashboard2/MyProperties/MyPropertiesProvider.context.js";
import AgentsTable from "./component/Dashboard2/AgentTable2.js";
import { AgentsProvider } from "./providers/AgentsProvider.context.js";
import CU_Agent from "./component/CU_Agent/CU_Agent.js";
import UserView from "./component/CU_Agent/index.js";
import PropertySingle from "./component/PropertySingle2/index.js";
import SponsorsProvider from "./component/Dashboard2/SponsorsEdit/Sponsors.provider.js";
import SponsorsEdit from "./component/Dashboard2/SponsorsEdit/SponsorsTable.js";
import Layout from "./component/Layouts/Layout.js";
import PrivilegedLayouts from "./component/Layouts/PrivilegedLayouts/PrivilegedLayouts.js";
import roles from "./types/roles.type.js";
import CU_Sponsor from "./component/Dashboard2/SponsorsEdit/CU_Sponsor.js";
import AboutUs from "./component/About2/index.js";



const App2 = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <AuthProvider>
                <AgentsProvider>

                    <Router>
                        <Routes>


                            <Route element={<Layout />} >

                                <Route path="" element={<Home />} />
                                <Route path="home" element={<Home />} />
                                {/* <Route path="property/:city" element={<Property />} /> */}
                                <Route path="property" element={<Property />} />


                                <Route path="property-single/:propertyId" element={<PropertySingle />} />


                                <Route path="agent-detail/:agentId" element={<AgentDetail />} />
                                {/* <Route path="our-agents" element={<OurAgents />} /> */}
                                <Route path="about" element={<AboutUs />} />
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
                                        <Route path="my-properties" element={<MyPropertiesProvider title="My properties"> <MyProperties title="My properties" /> </MyPropertiesProvider>} >
                                            <Route path="inspect-user/:userId" element={<UserView />} />
                                        </Route>
                                        <Route path="personal-info" element={<PersonalInfo />} />
                                        <Route path="change-password" element={<ChangePassword />} />


                                        <Route path="pending-properties" element={<MyPropertiesProvider title="Pending Properties"> <MyProperties title="Pending Properties" /> </MyPropertiesProvider>} >
                                            <Route path="inspect-user/:userId" element={<UserView />} />
                                        </Route>

                                        <Route path="unavailable-properties" element={<MyPropertiesProvider title="Unavailable Properties"> <MyProperties title="Unavailable Properties" /> </MyPropertiesProvider>} >
                                            <Route path="inspect-user/:userId" element={<UserView />} />
                                        </Route>
                                        {
                                            // * Admin only Routes 
                                        }
                                        <Route element={<PrivilegedLayouts authorizedRoles={roles.ADMIN} />}>

                                            <Route path="sponsors" element={<SponsorsProvider> <SponsorsEdit /></SponsorsProvider>} >
                                                <Route path="add-sponsor" element={<CU_Sponsor />} />
                                                <Route path="edit-sponsor/:sponsorId" element={<CU_Sponsor />} />
                                            </Route>

                                            <Route path="agents" element={<AgentsTable />} >
                                                <Route path="add-agent" element={<CU_Agent />} />
                                                <Route path="edit-agent/:agentId" element={<CU_Agent />} />
                                            </Route>

                                        </Route>

                                        {/* <Route path="add-agent" element={<UpdatePersonalInfo isModalOpen={true} toggleModal={() => { }} />}></Route> */}

                                    </Route>

                                    <Route path="dashboard/my-properties/edit-property/:propertyId" element={<EditPendingProperty />} />
                                    <Route path="dashboard/pending-properties/edit-property/:propertyId" element={<EditPendingProperty />} />



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