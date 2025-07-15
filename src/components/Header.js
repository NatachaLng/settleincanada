import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/img/logo.png" alt="SettleInCanada logo" className={styles.logoImg} />
        Settle in Canada
      </div>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <div className={styles.dropdown}>
            <button className={styles.dropdownBtn}>All Pages <span className={styles.caret}>▼</span></button>
            {/* Dropdown menu placeholder */}
          </div>
          <a href="#programs">Programs</a>
          <a href="#blogs">Blogs</a>
        </div>
        <a href="#donate" className={styles.donateBtn}>Donate Now</a>
      </nav>
    </div>
  </header>
);

export default Header; 