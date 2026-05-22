import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CONTACT } from '../../data/menu';
import { formatPrice } from '../../utils/price';
import styles from './OrderToast.module.css';

export function OrderToast() {
  const { lastReceipt, dismissReceipt } = useCart();

  const itemCount =
    lastReceipt?.lines.reduce((n, l) => n + l.quantity, 0) ?? 0;

  return (
    <AnimatePresence>
      {lastReceipt && (
        <motion.aside
          className={styles.receipt}
          role="status"
          aria-label="Order receipt"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <button
            type="button"
            className={styles.dismiss}
            onClick={dismissReceipt}
            aria-label="Dismiss receipt"
          >
            <X size={18} />
          </button>

          <div className={styles.receiptTop} aria-hidden>
            <span className={styles.perforation} />
          </div>

          <header className={styles.header}>
            <img
              src="/images/dopa-treats-logo.jpg"
              alt=""
              className={styles.logo}
            />
            <p className={styles.brand}>DOPA TREATS</p>
            <p className={styles.receiptLabel}>Virtual receipt</p>
          </header>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span>Order</span>
              <span className={styles.orderId}>{lastReceipt.id}</span>
            </div>
            <div className={styles.metaRow}>
              <span>Date</span>
              <span>{lastReceipt.placedAt}</span>
            </div>
            <div className={styles.metaRow}>
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
          </div>

          <ul className={styles.items}>
            {lastReceipt.lines.map((line) => (
              <li key={line.id} className={styles.item}>
                <span className={styles.itemName}>
                  {line.quantity}× {line.name}
                  {line.size ? ` (${line.size})` : ''}
                </span>
                <span className={styles.itemPrice}>
                  {formatPrice(line.unitPrice * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.totalRow}>
            <span>Total paid</span>
            <span className={styles.total}>{formatPrice(lastReceipt.total)}</span>
          </div>

          <p className={styles.pickup}>
            Pick up at {CONTACT.locationShort}
          </p>
          <p className={styles.thanks}>Thank you — please come back!</p>

          <div className={styles.receiptBottom} aria-hidden>
            <span className={styles.perforation} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
