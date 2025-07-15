import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/img/logo.png" alt="Settle in Canada logo" className={styles.logoImg} />
        <span className={styles.siteName}>Settle in Canada</span>
      </div>
      <nav className={styles.nav}>
        <a href="/" className={styles.link}>Home</a>
        <a href="/calculator" className={styles.link}>Day Calculator</a>
        <a href="/faq" className={styles.link}>Post eCOPR FAQ</a>
        <a href="https://coff.ee/settleincanada" className={styles.link} target="_blank" rel="noopener noreferrer">Buy us a coffee</a>
      </nav>
    </div>
    <div className={styles.copyright}>
      &copy; {new Date().getFullYear()} Settle in Canada. All rights reserved.
    </div>
  </footer>
);

export default Footer; 