import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function DashboardSidebarBtn({ active, handleActive, title, children,path }: any) {
  return (
    <Link  to={`/${path}`}
      className={`list-group-item  ${active === title && "active"}`}
      onClick={() => handleActive(title)}
    >
      <div className="homec-dashboard__list--icon">{children}</div>
      {title}
    </Link>
  );
}

DashboardSidebarBtn.propTypes = {
  active: ProtoTypes.string.isRequired,
  handleActive: ProtoTypes.func.isRequired,
  title: ProtoTypes.string.isRequired,
  children: ProtoTypes.node.isRequired,
};

export default DashboardSidebarBtn;
