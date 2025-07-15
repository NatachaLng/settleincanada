import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <a href="/" className={styles.logo} style={{textDecoration: 'none'}}>
        <img src="/img/logo.png" alt="SettleInCanada logo" className={styles.logoImg} />
        Settle in Canada
      </a>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <a href="/calculator">Day Calculator</a>
          <a href="/checklist">Checklist</a>
          <a href="/faq">FAQ</a>
        </div>
        <a href="#donate" className={styles.donateBtn}>Donate Now</a>
      </nav>
    </div>
  </header>
);

export default Header; 