import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <NavLink className='sidebar-link' to='/'>
        Home
      </NavLink>
      <NavLink className='sidebar-link' to='/products'>
        Products
      </NavLink>
      <NavLink className='sidebar-link' to='/users'>
        Users
      </NavLink>
      <NavLink className='sidebar-link' to='/roles'>
        Roles
      </NavLink>
      <NavLink className='sidebar-link' to='/playground'>
        Playground
      </NavLink>
    </div>
  );
}

export default Sidebar;
