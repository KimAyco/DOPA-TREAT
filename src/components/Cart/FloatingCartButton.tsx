import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './FloatingCartButton.module.css';

export function FloatingCartButton() {
  const { itemCount, openCart, isCheckoutOpen } = useCart();

  if (isCheckoutOpen) return null;

  return (
    <button
      type="button"
      className={styles.fab}
      onClick={openCart}
      aria-label={`Open cart, ${itemCount} items`}
    >
      <ShoppingCart size={22} aria-hidden />
      <span className={styles.label}>Cart</span>
      <span
        className={`${styles.badge} ${itemCount === 0 ? styles.badgeHidden : ''}`}
        aria-hidden
      >
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </button>
  );
}
