import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import styles from './OrderToast.module.css';

export function OrderToast() {
  const { lastOrderId, dismissOrderSuccess } = useCart();

  useEffect(() => {
    if (!lastOrderId) return;
    const t = window.setTimeout(dismissOrderSuccess, 8000);
    return () => window.clearTimeout(t);
  }, [lastOrderId, dismissOrderSuccess]);

  return (
    <AnimatePresence>
      {lastOrderId && (
        <motion.div
          className={styles.toast}
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          <p className={styles.text}>
            Order <span className={styles.orderId}>{lastOrderId}</span> confirmed!
            Pick up at the stall.
          </p>
          <button type="button" className={styles.dismiss} onClick={dismissOrderSuccess}>
            OK
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
