import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBtn({ link, text, children }:{link:string,text:string,children?:any}) {
  return (
    <>
      {children ? (
        <li className="menu-item-has-children ">
          <Link to={link}>{text}</Link>
          <ul className="sub-menu">{children}</ul>
        </li>
      ) : (
        <li>
          <Link to={link}>{text}</Link>
        </li>
      )}
    </>
  );
}



export default NavBtn;
