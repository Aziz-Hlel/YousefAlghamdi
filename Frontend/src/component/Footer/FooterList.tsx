import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

const FooterList = ({ link, title }: { link: string, title: string }) => {
  return (
    <li>
      <Link to={link}>
        <i className="fa-solid fa-minus"></i>
        {title}
      </Link>
    </li>
  );
}



export default FooterList;
