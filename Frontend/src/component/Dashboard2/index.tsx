import { useEffect, useState } from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import Sidebar from "./Sidebar2";
import DashboardComp from "./DashboardComp";
import MyProperties from "./MyProperties/MyProperties2";
import AgentsTable from "./AgentTable2";
import PersonalInfo from "./MyProperties/PersonalInfo2/PersonalInfo2";
import Saved from "./Saved";
import Reviews from "./Reviews";
import ChangePassword from "./ChangePassword";
import { Outlet, useNavigate } from "react-router-dom";
import GoTopBtn from "../Button/GoTopBtn";
import Preloader from "../Loader";
import apiGateway from "@src/utils/apiGateway";
import Http from "@src/services/Http";
import { useAuth } from "@src/providers/AuthProvider.context";

function Dashboard() {
  // Inner navigation
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const navigate = useNavigate();

  const logout = useAuth().logout
  // navigate to logout


  const setActiveComponentWrapper = async (value: string) => {
    value === "Logout" && logout()
    setActiveComponent(value);
  }
  // loading handle

  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        <Breadcrumbs
          title={activeComponent}
          titlePosition="bottom"
          overlay={true}
          background="url(/img/bread-overlay.jpg)"
        >

          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks link="/dashboard" text="Dashboard" isActive={true} />
        </Breadcrumbs>
        <section className="homec-dashboard pd-top-100 pd-btm-100 homec-bg-third-color">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="homec-dashboard__middle">
                  <div className="row">


                    <Sidebar
                      activeComponent={activeComponent}
                      setComponent={setActiveComponentWrapper}
                    />

                    {/* {activeComponent === "Dashboard" && <DashboardComp />} */}

                    {/* {activeComponent === "My Properties" && <MyProperties />} */}
                    {/* {activeComponent === "Invoice" && <InvoiceTable />} */}
                    {/* {activeComponent === "Personals Info" && <PersonalInfo />} */}
                    {/* {activeComponent === "Saved" && <Saved />} */}
                    {/* {activeComponent === "Reviews" && <Reviews />} */}
                    {/* {activeComponent === "Change Password" && (
                      <ChangePassword />
                    )} */}
                    <Outlet />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DownloadApp />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default Dashboard;
