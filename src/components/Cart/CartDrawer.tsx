import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/price';
import { Button } from '../ui/Button';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const reduced = useReducedMotion();
  const {
    lines,
    itemCount,
    subtotal,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQuantity,
    removeLine,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            className={styles.overlay}
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-label="Shopping cart"
            initial={reduced ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 36 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Your cart ({itemCount})</h2>
              <button
                type="button"
                className={styles.close}
                onClick={closeCart}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.body}>
              {lines.length === 0 ? (
                <div className={styles.empty}>
                  <ShoppingBag size={48} className={styles.emptyIcon} aria-hidden />
                  <p>Your cart is empty.</p>
                  <p>Browse the menu and add your favorites.</p>
                </div>
              ) : (
                <ul className={styles.list}>
                  {lines.map((line) => (
                    <li key={line.id} className={styles.line}>
                      <div className={styles.lineInfo}>
                        <span className={styles.lineCategory}>{line.categoryTitle}</span>
                        <span className={styles.lineName}>
                          {line.name}
                          {line.size ? ` · ${line.size}` : ''}
                        </span>
                        <span className={styles.lineMeta}>
                          {line.priceLabel} each
                        </span>
                      </div>
                      <span className={styles.linePrice}>
                        {formatPrice(line.unitPrice * line.quantity)}
                      </span>
                      <div className={styles.qtyRow}>
                        <div className={styles.qtyControls}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(line.id, line.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span className={styles.qtyValue}>{line.quantity}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(line.id, line.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeLine(line.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span className={styles.subtotalLabel}>Subtotal</span>
                <span className={styles.subtotalAmount}>{formatPrice(subtotal)}</span>
              </div>
              <Button
                size="lg"
                className={styles.checkoutBtn}
                onClick={openCheckout}
                disabled={lines.length === 0}
              >
                Checkout
              </Button>
              <p className={styles.mockNote}>Demo checkout — no real charges.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
