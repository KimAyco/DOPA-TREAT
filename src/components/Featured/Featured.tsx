import { motion, useReducedMotion } from 'framer-motion';
import styles from './Featured.module.css';

const highlights = [
  'Fried Tofu from ₱35',
  'Cucumber Salad ₱30',
  'Graham Cake ₱35',
  'Drinks from ₱10',
  'Tabuan sa DNSC',
  'Fresh daily',
];

export function Featured() {
  const reduced = useReducedMotion();
  const items = [...highlights, ...highlights];

  return (
    <section className={styles.featured} aria-label="Highlights">
      <div className={styles.trackWrap}>
        <motion.div
          className={styles.track}
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduced
              ? undefined
              : { duration: 28, repeat: Infinity, ease: 'linear' }
          }
        >
          {items.map((text, i) => (
            <span key={`${text}-${i}`} className={styles.item}>
              <span className={styles.dot} aria-hidden />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
