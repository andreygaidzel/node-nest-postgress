import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import UserAvatar from '@/components/layout/sidebar/user-avatar/UserAvatar.tsx';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <NavLink className={styles.sidebarLink} to='/'>
          Home
        </NavLink>
        <NavLink className={styles.sidebarLink} to='/products'>
          Products
        </NavLink>
        <NavLink className={styles.sidebarLink} to='/posts'>
          Posts
        </NavLink>
        <NavLink className={styles.sidebarLink} to='/users'>
          Users
        </NavLink>
        <NavLink className={styles.sidebarLink} to='/roles'>
          Roles
        </NavLink>
        <NavLink className={styles.sidebarLink} to='/playground'>
          Playground
        </NavLink>
      </div>

      <UserAvatar />
    </div>
  );
}

export default Sidebar;
