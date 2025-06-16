import { useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import { listing_types } from "@src/types/listing_types.types";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";
import { useAuth } from "@src/providers/AuthProvider.context";
import CustomLanguageOption from "../Navbar/CustomLanguageOption";
import MobileCustomLanguages from "./MobileCustomLanguages";

interface ImobileMenu {
  handleSidebar: () => void;
  show: boolean;
}

const MobileMenu = ({ handleSidebar, show }: ImobileMenu) => {
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const { t } = useTranslation(['home', 'common']);
  const { user } = useAuth();

  { capitalizePhrase(t(getText.common.test)) }


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
                  {capitalizePhrase(t(getText.home.navigation.home))}
                </Link>
              </li>

              <li className={`menu-item-has-children ${activeSubmenu === "properties" && "active"}`} >

                <Link
                  to="#"
                  onClick={(_) => handleActive("properties")} >
                  {capitalizePhrase(t(getText.home.navigation.properties.properties))}
                </Link>

                <ul className="sub-menu" onClick={handleSidebar}>

                  <li>
                    <Link to="/property"> {capitalizePhrase(t(getText.home.navigation.properties.properties))}</Link>
                  </li>
                  <li>
                    <Link to={`/property?listingType=${listing_types.rent}`} > {capitalizePhrase(t(getText.home.navigation.properties.rent))}</Link>
                  </li>
                  <li>
                    <Link to={`/property?listingType=${listing_types.sale}`} > {capitalizePhrase(t(getText.home.navigation.properties.sale))}</Link>
                  </li>
                  <li>
                    <Link to={`/property?listingType=${listing_types.commercialRent}`} > {capitalizePhrase(t(getText.home.navigation.properties.commercialRent))}</Link>
                  </li>
                  <li>
                    <Link to={`/property?listingType=${listing_types.commercialSale}`} > {capitalizePhrase(t(getText.home.navigation.properties.commercialSale))}</Link>
                  </li>

                </ul>

              </li>

              <li>
                <Link to="/about" onClick={handleSidebar}> {capitalizePhrase(t(getText.home.navigation.about))}</Link>
              </li>

              <li>
                <Link to="/contact" onClick={handleSidebar}> {capitalizePhrase(t(getText.home.navigation.contact))}</Link>
              </li>

              <li>
                {user ?
                  <Link to="/dashboard/personal-info" onClick={handleSidebar}>
                    {capitalizePhrase(t(getText.home.navigation.profile))}
                  </Link>
                  :
                  <Link to="/login" onClick={handleSidebar}>
                    {capitalizePhrase(t(getText.home.navigation.login))}
                  </Link>}
              </li>

              <li>
                <MobileCustomLanguages handleSidebar={handleSidebar} />
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
