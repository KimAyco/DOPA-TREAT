import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { CONTACT } from '../../data/menu';
import { Button } from '../ui/Button';
import styles from './LocationMap.module.css';

export function LocationMap() {
  const reduced = useReducedMotion();

  return (
    <section id="location" className={styles.section} aria-labelledby="map-heading">
      <div className="container">
        <motion.div
          className={styles.panel}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.copy}>
            <span className={styles.label}>Visit us</span>
            <h2 id="map-heading" className={styles.heading}>
              Find us at <span className={styles.headingAccent}>DNSC</span>
            </h2>
            <p className={styles.lead}>
              Grab your treats at our stall on campus — easy to spot, always worth
              the walk.
            </p>

            <ul className={styles.details}>
              <li className={styles.detailItem}>
                <span className={styles.detailIcon} aria-hidden>
                  <MapPin size={20} />
                </span>
                <span>
                  <span className={styles.detailTitle}>Campus</span>
                  <span className={styles.detailText}>{CONTACT.location}</span>
                </span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailIcon} aria-hidden>
                  <MapPin size={20} />
                </span>
                <span>
                  <span className={styles.detailTitle}>Stall</span>
                  <span className={styles.detailText}>{CONTACT.locationShort}</span>
                </span>
              </li>
            </ul>

            <Button
              href={CONTACT.mapsLink}
              variant="secondary"
              size="lg"
              className={styles.cta}
            >
              <>
                <Navigation size={18} aria-hidden />
                Get directions
              </>
            </Button>
          </div>

          <div className={styles.mapCol}>
            <span className={styles.mapBadge}>Panabo City</span>
            <div className={styles.mapWrap}>
              <iframe
                title="DOPA TREATS location — Davao del Norte State College, Panabo City"
                src={CONTACT.mapsEmbedUrl}
                className={styles.mapFrame}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
