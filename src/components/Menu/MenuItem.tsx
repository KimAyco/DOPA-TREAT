import type { MenuItem as MenuItemType } from '../../data/menu';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  item: MenuItemType;
  variant?: 'default' | 'stacked';
  theme?: 'stack' | 'modal';
}

export function MenuItem({ item, variant = 'default', theme = 'stack' }: MenuItemProps) {
  const themeClass =
    theme === 'modal' ? styles.modalTheme : theme === 'stack' ? styles.stackTheme : '';

  if (item.sizes?.length) {
    return (
      <li className={`${styles.item} ${styles.itemStacked} ${themeClass}`}>
        <span className={styles.name}>{item.name}</span>
        <div className={styles.sizeRow}>
          {item.sizes.map((size) => (
            <span key={size.label} className={styles.sizeChip}>
              <span className={styles.sizeLabel}>{size.label}</span>
              <span className={styles.sizePrice}>{size.price}</span>
            </span>
          ))}
        </div>
      </li>
    );
  }

  return (
    <li
      className={`${styles.item} ${variant === 'stacked' ? styles.itemStacked : ''} ${themeClass}`}
    >
      <span className={styles.name}>
        {item.name}
        {item.note && <span className={styles.note}>{item.note}</span>}
      </span>
      <span className={styles.leader} aria-hidden="true" />
      {item.price && <span className={styles.price}>{item.price}</span>}
    </li>
  );
}
