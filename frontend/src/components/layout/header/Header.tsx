import styles from './Header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <i className={styles.headerLeft__logo}>React Store</i>
      </div>
    </div>
  );
}

export default Header;