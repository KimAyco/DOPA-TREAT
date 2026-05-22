import { motion, useReducedMotion } from 'framer-motion';
import type { MenuCategory } from '../../data/menu';
import { MenuItem } from './MenuItem';
import styles from './MenuCard.module.css';

interface MenuCardProps {
  category: MenuCategory;
  index: number;
  onOpen: () => void;
}

export function MenuCard({ category, index, onOpen }: MenuCardProps) {
  const reduced = useReducedMotion();
  const isHero = category.layout === 'hero';
  const isWide = category.layout === 'wide';

  return (
    <motion.button
      type="button"
      className={`${styles.cardBtn} ${styles.card} ${styles[category.layout]}`}
      data-category={category.id}
      onClick={onOpen}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -3 }}
      aria-label={`Open ${category.title} menu`}
    >
      <div className={styles.media}>
        <img
          src={category.image}
          alt={category.imageAlt}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.mediaOverlay} />
        <div className={styles.mediaText}>
          <h3 className={styles.title}>{category.title}</h3>
          <p className={styles.tagline}>{category.tagline}</p>
        </div>
      </div>

      <div className={styles.body}>
        {category.stackHint ? (
          <p className={styles.scrollHint}>{category.stackHint}</p>
        ) : isHero && category.items.length > 1 ? (
          <ul className={styles.flavorGrid}>
            {category.items.map((item) => (
              <li key={item.name} className={styles.flavorChip}>
                <span className={styles.flavorName}>{item.name}</span>
                <span className={styles.flavorPrice}>{item.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.list}>
            {category.items.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                variant={isWide ? 'stacked' : 'default'}
              />
            ))}
          </ul>
        )}
      </div>
    </motion.button>
  );
}
