import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import type { MenuCategory } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import { categoryToCartInputs } from '../../utils/cartItems';
import { AddableMenuRow } from './AddableMenuRow';
import { Button } from '../ui/Button';
import styles from './MenuDetailModal.module.css';

interface MenuDetailModalProps {
  category: MenuCategory | null;
  onClose: () => void;
}

export function MenuDetailModal({ category, onClose }: MenuDetailModalProps) {
  const reduced = useReducedMotion();
  const { addItems, openCart } = useCart();

  useEffect(() => {
    if (!category) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [category, onClose]);

  const isHero = category?.layout === 'hero';
  const isWide = category?.layout === 'wide';

  const handleAddAll = () => {
    if (!category) return;
    addItems(categoryToCartInputs(category));
    openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {category && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.panel}
            layoutId={reduced ? undefined : `menu-card-${category.id}`}
            initial={reduced ? false : { opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <div className={styles.hero}>
              <img
                src={category.image}
                alt={category.imageAlt}
                className={styles.heroImg}
              />
              <div className={styles.heroOverlay} />
              <div className={styles.heroText}>
                <h2 id="menu-modal-title" className={styles.title}>
                  {category.title}
                </h2>
                <p className={styles.tagline}>{category.tagline}</p>
              </div>
            </div>

            <div className={styles.content}>
              <p className={styles.menuLabel}>Menu items</p>
              {isHero && category.items.length > 1 ? (
                <ul className={styles.flavorGrid}>
                  {category.items.map((item) => (
                    <AddableMenuRow
                      key={item.name}
                      category={category}
                      item={item}
                    />
                  ))}
                </ul>
              ) : (
                <ul className={styles.list}>
                  {category.items.map((item) => (
                    <AddableMenuRow
                      key={item.name}
                      category={category}
                      item={item}
                      variant={isWide ? 'stacked' : 'default'}
                    />
                  ))}
                </ul>
              )}

              <div className={styles.actions}>
                <Button size="lg" onClick={handleAddAll}>
                  <>
                    <ShoppingCart size={18} aria-hidden />
                    Add to cart
                  </>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
