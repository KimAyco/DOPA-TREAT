import { motion, useReducedMotion } from 'framer-motion';
import { galleryImages } from '../../data/menu';
import styles from './Gallery.module.css';

export function Gallery() {
  const reduced = useReducedMotion();

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <motion.header
          className={styles.header}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Gallery</span>
          <h2 className="section-heading">
            Made fresh, <span className="gradient-text">served with love</span>
          </h2>
          <p className={styles.subtitle}>
            A peek at what&apos;s waiting for you at the stall.
          </p>
        </motion.header>

        <div className={styles.mosaic}>
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.id}
              className={`${styles.card} ${styles[img.layout]}`}
              data-id={img.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.media}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.img}
                  loading="lazy"
                />
                <div className={styles.overlay} aria-hidden="true" />
                <figcaption className={styles.caption}>
                  <span className={styles.captionLabel}>{img.label}</span>
                  <span className={styles.captionHint}>DOPA TREATS</span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
