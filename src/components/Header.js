import React, { useState } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/calculator', label: 'Day Calculator' },
  { href: '/faq', label: 'FAQ' },
];

const COFFEE_LINK_NATACHA = 'https://coff.ee/settleincanada';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coffeeModalOpen, setCoffeeModalOpen] = useState(false);

  // Prevent background scroll when menu or modal is open
  React.useEffect(() => {
    if (menuOpen || coffeeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, coffeeModalOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logoWrap} aria-label="Home">
          <img src="/img/logo.png" alt="Settle in Canada logo" className={styles.logoImg} />
          <span className={styles.siteName}>Settle in Canada</span>
        </a>
        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className={styles.navLink}>{link.label}</a>
          ))}
          <button className={styles.donateBtn} onClick={() => setCoffeeModalOpen(true)} type="button">Buy us a coffee</button>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(o => !o)}
          type="button"
        >
          <span className={styles.hamburgerBar} style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span className={styles.hamburgerBar} style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className={styles.hamburgerBar} style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
        {/* Overlay for mobile menu */}
        {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
        {/* Mobile Slide-in Menu */}
        <nav
          id="mobile-menu"
          className={styles.mobileMenu + (menuOpen ? ' ' + styles.open : '')}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileMenuContent}>
            <button
              className={styles.closeBtn}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <a href="/" className={styles.logoWrap} onClick={() => setMenuOpen(false)}>
              <img src="/img/logo.png" alt="Settle in Canada logo" className={styles.logoImg} />
              <span className={styles.siteName}>Settle in Canada</span>
            </a>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className={styles.navLink} onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
            <button className={styles.donateBtn} onClick={() => setCoffeeModalOpen(true)} type="button">Buy us a coffee</button>
          </div>
        </nav>
        {/* Coffee Modal */}
        {coffeeModalOpen && (
          <div className={styles.coffeeModalOverlay} onClick={() => setCoffeeModalOpen(false)}>
            <div className={styles.coffeeModal} onClick={e => e.stopPropagation()}>
              <button className={styles.coffeeModalClose} aria-label="Close coffee modal" onClick={() => setCoffeeModalOpen(false)} type="button">&times;</button>
              <h2 className={styles.coffeeModalTitle}>Support us with a coffee</h2>
              <div className={styles.coffeeTilesRow}>
                <div className={styles.coffeeTile}>
                  <div className={styles.coffeeTileTitle}>Buy me a coffee: Natacha</div>
                  <a href={COFFEE_LINK_NATACHA} target="_blank" rel="noopener noreferrer" className={styles.coffeeTileBtn}>Support Natacha</a>
                </div>
                <div className={styles.coffeeTile}>
                  <div className={styles.coffeeTileTitle}>Buy me a coffee: Michael</div>
                  <div className={styles.coffeeTileComingSoon}>Coming soon</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 