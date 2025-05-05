import { useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

interface ImobileMenu {
  handleSidebar: () => void;
  show: boolean;
}

const MobileMenu = ({ handleSidebar, show }: ImobileMenu) => {
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const handleActive = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu("");
    } else {
      setActiveSubmenu(name);
    }
  };
  return (
    <div
      className={`modal offcanvas-modal fade ${show && "show"}`}
      id="offcanvas-modal"
      style={{ display: "block", zIndex: show ? "" : "-1" }}
      aria-modal={true}
      role="dialog"
      onClick={(e: any) => e.target.role === "dialog" && handleSidebar()}
    >
      <div className="modal-dialog offcanvas-dialog">
        <div className="modal-content">
          <div className="modal-header offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleSidebar}
            ></button>
          </div>
          {/* <!-- offcanvas-logo-start --> */}
          <div className="offcanvas-logo">
            <div className="homec-header__logo">
              <Link to="/">
                <img src="/img/logo.jpg" alt="#" />
              </Link>
            </div>
          </div>
          {/* <!-- offcanvas-logo-end --> */}
          {/* <!-- offcanvas-menu start --> */}
          <nav id="offcanvas-menu" className="offcanvas-menu">
            {/* <!-- Main Menu --> */}
            <ul className="nav-menu menu navigation list-none">

              <li>
                <Link to="/home" onClick={handleSidebar}>
                  Home
                </Link>
              </li>

              <li className={`menu-item-has-children ${activeSubmenu === "properties" && "active"}`} >

                <Link
                  to="#"
                  onClick={(_) => handleActive("properties")} >
                  Properties
                </Link>

                <ul className="sub-menu" onClick={handleSidebar}>

                  <li>
                    <Link to="/property">Properties</Link>
                  </li>

                  <li>
                    <Link to="/add-property">Add Property</Link>
                  </li>

                </ul>

              </li>

              <li>
                <Link to="/about" onClick={handleSidebar}>About us</Link>
              </li>

              <li>
                <Link to="/contact" onClick={handleSidebar}>Contact</Link>
              </li>

              <li>
                <Link to="/login" onClick={handleSidebar}>
                  Login
                </Link>
              </li>

            </ul>
            {/* <!-- End Main Menu --> */}
          </nav>
          {/* <!-- offcanvas-menu end --> */}
        </div>
      </div>
    </div>
  );
}



export default MobileMenu;
