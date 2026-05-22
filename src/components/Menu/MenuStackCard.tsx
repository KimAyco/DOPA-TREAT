import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { MenuCategory } from '../../data/menu';
import { MenuItem } from './MenuItem';
import styles from './MenuStackCard.module.css';

interface MenuStackCardProps {
  category: MenuCategory;
  onOpen: () => void;
  layoutId?: string;
}

export function MenuStackCard({ category, onOpen, layoutId }: MenuStackCardProps) {
  const isHero = category.layout === 'hero';
  const isWide = category.layout === 'wide';

  return (
    <motion.button
      type="button"
      className={styles.cardBtn}
      onClick={onOpen}
      layoutId={layoutId}
      aria-label={`Open ${category.title} menu`}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.card}>
        <span className={styles.tapHint}>Tap to open</span>
        <div className={styles.media}>
          <img
            src={category.image}
            alt={category.imageAlt}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.overlay} />
          <div className={styles.mediaText}>
            <h3 className={styles.title}>{category.title}</h3>
            <p className={styles.tagline}>{category.tagline}</p>
          </div>
        </div>

        <div className={styles.body}>
          {category.stackHint ? (
            <p className={styles.scrollHint}>
              <span className={styles.hintPrimary}>
                {category.stackHint.split(' — ')[0]}
              </span>
              <span className={styles.hintSecondary}>
                {category.stackHint.split(' — ')[1] ?? 'scroll down'}
              </span>
              <ChevronDown size={22} aria-hidden className={styles.scrollIcon} />
            </p>
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
      </div>
    </motion.button>
  );
}
