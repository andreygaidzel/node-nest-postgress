import './Sidebar.scss'
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink className="sidebar-link" to="/">
        Home page
      </NavLink>
      <NavLink className="sidebar-link" to="/products">
        Products page
      </NavLink>
    </div>
  );
}

export default Sidebar;
