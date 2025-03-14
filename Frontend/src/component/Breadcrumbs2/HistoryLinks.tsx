
import { Link } from "react-router-dom";

function HistoryLinks({ link, text, isActive }: { link: string; text: string; isActive: boolean }) {
  return (
    <li className={isActive ? "active" : ""} >
      <Link to={link}>{text}</Link>
    </li>
  );
}



export default HistoryLinks;
