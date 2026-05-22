import { motion, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '../../data/menu';
import { Button } from '../ui/Button';
import styles from './Footer.module.css';

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.glow} aria-hidden />

      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.heroRow}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.brandBlock}>
            <img
              src="/images/dopa-treats-logo.jpg"
              alt=""
              className={styles.logoImg}
              width={160}
              height={160}
              loading="lazy"
            />
            <div className={styles.brandText}>
              <span className={styles.brandName}>
                <span className={styles.brandMain}>DOPA</span>
                <span className={styles.brandSub}>TREATS</span>
              </span>
              <span className={styles.brandTagline}>Your daily dose of joy</span>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>
              Ready for your
              <br />
              <span className={styles.ctaAccent}>daily dose?</span>
            </h2>
            <p className={styles.ctaDesc}>
              Visit us at DNSC Panabo or call ahead — we&apos;ll have your treats
              ready when you arrive.
            </p>
            <Button href={CONTACT.phoneTel} size="lg" className={styles.ctaBtn}>
              <>
                <Phone size={18} aria-hidden />
                {CONTACT.phone}
              </>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.infoRow}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <article className={styles.infoCard}>
            <span className={styles.infoIcon} aria-hidden>
              <MapPin size={22} />
            </span>
            <div>
              <h3 className={styles.infoLabel}>Location</h3>
              <p className={styles.infoText}>{CONTACT.location}</p>
              <p className={styles.infoMeta}>{CONTACT.locationShort}</p>
            </div>
          </article>

          <article className={styles.infoCard}>
            <span className={styles.infoIcon} aria-hidden>
              <Clock size={22} />
            </span>
            <div>
              <h3 className={styles.infoLabel}>Hours</h3>
              <p className={styles.infoText}>Open daily</p>
              <p className={styles.infoMeta}>Message us for today&apos;s hours</p>
            </div>
          </article>

          <article className={`${styles.infoCard} ${styles.infoCardHighlight}`}>
            <span className={styles.infoIcon} aria-hidden>
              <Phone size={22} />
            </span>
            <div>
              <h3 className={styles.infoLabel}>Call to order</h3>
              <a href={CONTACT.phoneTel} className={styles.phoneLink}>
                {CONTACT.phone}
              </a>
              <p className={styles.infoMeta}>Tap to call — demo site</p>
            </div>
          </article>
        </motion.div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} DOPA TREATS
          </p>
          <a href="#location" className={styles.bottomLink}>
            Directions
          </a>
        </div>
      </div>
    </footer>
  );
}
