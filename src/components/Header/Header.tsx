import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { CONTACT } from '../../data/menu';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <a href="#home" className={styles.logo}>
            <img
              src="/images/mascot.jpg"
              alt=""
              className={styles.logoImg}
              width={40}
              height={40}
            />
            <span className={styles.logoText}>
              <span className={styles.logoMain}>DOPA</span>
              <span className={styles.logoSub}>TREAT</span>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href={CONTACT.phoneTel} className={styles.orderBtn}>
            <Phone size={16} aria-hidden />
            <span className={styles.orderLabel}>Order</span>
          </a>
        </div>
      </div>
    </header>
  );
}
