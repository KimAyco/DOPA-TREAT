import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { MenuCategory, MenuItem } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import { menuItemToCartInputs } from '../../utils/cartItems';
import styles from './AddableMenuRow.module.css';

interface AddableMenuRowProps {
  category: MenuCategory;
  item: MenuItem;
  variant?: 'default' | 'stacked';
}

export function AddableMenuRow({
  category,
  item,
  variant = 'default',
}: AddableMenuRowProps) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    () => item.sizes?.[0]?.label ?? '',
  );

  const handleAdd = () => {
    const inputs = menuItemToCartInputs(category, item, selectedSize);
    inputs.forEach((input) => addItem(input));
    openCart();
  };

  if (item.sizes?.length) {
    return (
      <li className={`${styles.row} ${styles.rowStacked}`}>
        <div className={styles.rowMain}>
          <span className={styles.name}>{item.name}</span>
          <div className={styles.sizeRow}>
            {item.sizes.map((size) => (
              <button
                key={size.label}
                type="button"
                className={`${styles.sizeChip} ${
                  selectedSize === size.label ? styles.sizeChipActive : ''
                }`}
                onClick={() => setSelectedSize(size.label)}
              >
                <span className={styles.sizeLabel}>{size.label}</span>
                <span className={styles.sizePrice}>{size.price}</span>
              </button>
            ))}
          </div>
        </div>
        <button type="button" className={styles.addBtn} onClick={handleAdd}>
          <Plus size={18} aria-hidden />
          <span>Add</span>
        </button>
      </li>
    );
  }

  return (
    <li
      className={`${styles.row} ${variant === 'stacked' ? styles.rowStacked : ''}`}
    >
      <span className={styles.name}>{item.name}</span>
      {item.price && <span className={styles.price}>{item.price}</span>}
      <button type="button" className={styles.addBtn} onClick={handleAdd}>
        <Plus size={18} aria-hidden />
        <span>Add</span>
      </button>
    </li>
  );
}
