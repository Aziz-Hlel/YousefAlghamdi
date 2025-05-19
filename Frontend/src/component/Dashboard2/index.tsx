import { useEffect, useState } from "react";

import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import DownloadApp from "../DownloadApp";

import Sidebar from "./Sidebar2";

import { Outlet, useNavigate } from "react-router-dom";
import Preloader from "../Loader";

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

                
                    <Outlet />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DownloadApp />
      </>
    );
  }
  return component;
}

export default Dashboard;
