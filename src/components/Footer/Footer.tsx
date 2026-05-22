import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT } from '../../data/menu';
import { Button } from '../ui/Button';
import styles from './Footer.module.css';

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.ctaBlock}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.ctaTitle}>
            Ready for your
            <br />
            <span className="gradient-text">daily dose?</span>
          </h2>
          <p className={styles.ctaDesc}>
            Visit us at Tabuan or call ahead — we&apos;ll have your treats ready.
          </p>
          <Button href={CONTACT.phoneTel} size="lg">
            <>
              <Phone size={18} aria-hidden />
              {CONTACT.phone}
            </>
          </Button>
        </motion.div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <MapPin className={styles.icon} size={22} aria-hidden />
            <div>
              <span className={styles.infoLabel}>Location</span>
              <p>{CONTACT.location}</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <Clock className={styles.icon} size={22} aria-hidden />
            <div>
              <span className={styles.infoLabel}>Hours</span>
              <p>Open daily — message us for hours</p>
            </div>
          </div>
          <div className={styles.brand}>
            <img
              src="/images/mascot.jpg"
              alt=""
              className={styles.mascot}
              width={64}
              height={64}
              loading="lazy"
            />
            <span className={styles.logo}>DOPA TREATS</span>
            <span className={styles.tagline}>Your daily dose of joy</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} DOPA TREATS</p>
      </div>
    </footer>
  );
}
