import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/price';
import { Button } from '../ui/Button';
import styles from './CheckoutModal.module.css';

type Step = 'form' | 'processing' | 'thankyou' | 'success';

const PROCESSING_DURATION_MS = 8000;
const THANKYOU_DURATION_MS = 2000;

const PROCESSING_MESSAGES = [
  'Preparing your order…',
  'Securing payment…',
  'Confirming with DOPA TREATS…',
  'Almost there…',
];

const DEMO_CARD = {
  cardName: 'Demo Customer',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvv: '123',
};

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const pageVariants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  exit: { y: '100%' },
};

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function CheckoutModal() {
  const reduced = useReducedMotion();
  const {
    lines,
    subtotal,
    isCheckoutOpen,
    closeCheckout,
    completeOrder,
    lastReceipt,
  } = useCart();

  const [step, setStep] = useState<Step>('form');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [processingMsg, setProcessingMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const checkoutVideoRef = useRef<HTMLVideoElement>(null);

  const stepIndex =
    step === 'form'
      ? 0
      : step === 'processing'
        ? 1
        : step === 'thankyou'
          ? 2
          : 3;

  useEffect(() => {
    if (!isCheckoutOpen) {
      setStep('form');
      setOrderId(null);
      setProgress(0);
      setProcessingMsg(0);
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvv('');
    } else {
      setCardName(DEMO_CARD.cardName);
      setCardNumber(DEMO_CARD.cardNumber);
      setExpiry(DEMO_CARD.expiry);
      setCvv(DEMO_CARD.cvv);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (step !== 'processing') return;

    setProgress(0);
    setProcessingMsg(0);

    const video = checkoutVideoRef.current;
    if (video) {
      video.currentTime = 0;
      video.volume = 1;
      void video.play().catch(() => {
        /* autoplay with sound may be blocked until user gesture */
      });
    }

    const progressTick = PROCESSING_DURATION_MS / 100;
    const progressInterval = window.setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, progressTick);

    const msgInterval = window.setInterval(() => {
      setProcessingMsg((m) => (m + 1) % PROCESSING_MESSAGES.length);
    }, PROCESSING_DURATION_MS / PROCESSING_MESSAGES.length);

    const doneTimer = window.setTimeout(() => {
      setStep('thankyou');
    }, PROCESSING_DURATION_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(msgInterval);
      window.clearTimeout(doneTimer);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per processing step
  }, [step]);

  useEffect(() => {
    if (step !== 'thankyou') return;

    const thankyouTimer = window.setTimeout(() => {
      const id = completeOrder();
      setOrderId(id);
      setStep('success');
    }, THANKYOU_DURATION_MS);

    return () => window.clearTimeout(thankyouTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per thank-you step
  }, [step]);

  const displayNumber = cardNumber || '•••• •••• •••• ••••';
  const canPay =
    cardName.trim().length > 1 &&
    cardNumber.replace(/\s/g, '').length >= 16 &&
    expiry.length >= 5 &&
    cvv.length >= 3;

  const startPayment = () => {
    setStep('processing');
  };

  const handleDemoPay = () => {
    setCardName(DEMO_CARD.cardName);
    setCardNumber(DEMO_CARD.cardNumber);
    setExpiry(DEMO_CARD.expiry);
    setCvv(DEMO_CARD.cvv);
    startPayment();
  };

  const handlePay = () => {
    if (!canPay) return;
    startPayment();
  };

  const handleClose = () => {
    closeCheckout();
  };

  const pageTransition = reduced
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 320, damping: 34 };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className={styles.page}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={pageTransition}
        >
          <div className={styles.pageBg} aria-hidden />

          <header className={styles.header}>
            <button
              type="button"
              className={styles.back}
              onClick={handleClose}
              aria-label="Back to cart"
            >
              <ArrowLeft size={18} aria-hidden />
              Back
            </button>
            <h1 id="checkout-title" className={styles.headerTitle}>
              {step === 'success'
                ? 'Order complete'
                : step === 'thankyou'
                  ? 'Thank you'
                  : 'Checkout'}
            </h1>
            <div className={styles.steps} aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`${styles.stepDot} ${
                    i < stepIndex
                      ? styles.stepDotDone
                      : i === stepIndex
                        ? styles.stepDotActive
                        : ''
                  }`}
                />
              ))}
            </div>
          </header>

          <main className={styles.main}>
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  className={styles.mainInner}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reduced ? 0 : 0.35 }}
                >
                  <div className={styles.formGrid}>
                    <section className={styles.summaryCard}>
                      <h2 className={styles.summaryTitle}>Your order</h2>
                      <ul className={styles.lineList}>
                        {lines.map((line) => (
                          <li key={line.id} className={styles.lineItem}>
                            <span>
                              <span className={styles.lineName}>
                                {line.name}
                                {line.size ? ` · ${line.size}` : ''}
                              </span>
                              <span className={styles.lineQty}>
                                {' '}
                                × {line.quantity}
                              </span>
                            </span>
                            <span className={styles.linePrice}>
                              {formatPrice(line.unitPrice * line.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                    </section>

                    <section className={styles.paymentCard}>
                      <p className={styles.paymentLabel}>Virtual payment</p>
                      <motion.div
                        className={styles.cardPreview}
                        layout
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <div className={styles.cardChip} aria-hidden />
                        <span className={styles.cardBrand}>DOPA TREATS</span>
                        <span className={styles.cardNumber}>{displayNumber}</span>
                        <div className={styles.cardRow}>
                          <span>{cardName || 'CARDHOLDER'}</span>
                          <span>{expiry || 'MM/YY'}</span>
                        </div>
                      </motion.div>

                      <form
                        className={styles.form}
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (canPay) handlePay();
                          else handleDemoPay();
                        }}
                      >
                        <div className={styles.field}>
                          <label htmlFor="card-name">Name on card</label>
                          <input
                            id="card-name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Juan Dela Cruz"
                            autoComplete="cc-name"
                          />
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="card-number">Card number</label>
                          <input
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCardNumber(e.target.value))
                            }
                            placeholder="4242 4242 4242 4242"
                            inputMode="numeric"
                            autoComplete="cc-number"
                          />
                        </div>
                        <div className={styles.fieldRow}>
                          <div className={styles.field}>
                            <label htmlFor="card-expiry">Expiry</label>
                            <input
                              id="card-expiry"
                              value={expiry}
                              onChange={(e) =>
                                setExpiry(formatExpiry(e.target.value))
                              }
                              placeholder="MM/YY"
                              inputMode="numeric"
                              autoComplete="cc-exp"
                            />
                          </div>
                          <div className={styles.field}>
                            <label htmlFor="card-cvv">CVV</label>
                            <input
                              id="card-cvv"
                              value={cvv}
                              onChange={(e) =>
                                setCvv(
                                  e.target.value.replace(/\D/g, '').slice(0, 4),
                                )
                              }
                              placeholder="123"
                              inputMode="numeric"
                              autoComplete="cc-csc"
                            />
                          </div>
                        </div>
                      </form>
                    </section>
                  </div>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  key="processing"
                  className={styles.processing}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reduced ? 0 : 0.35 }}
                >
                  <div className={styles.processingVideoWrap}>
                    <video
                      ref={checkoutVideoRef}
                      className={styles.processingVideo}
                      src="/images/dopa-checkout.mp4"
                      autoPlay
                      playsInline
                      poster="/images/dopa-treats-logo.jpg"
                      aria-label="DOPA TREATS checkout animation"
                    />
                  </div>
                  <h2 className={styles.processingTitle}>Processing payment</h2>
                  <motion.p
                    key={processingMsg}
                    className={styles.processingStatus}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {PROCESSING_MESSAGES[processingMsg]}
                  </motion.p>
                  <div className={styles.progressTrack}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress / 100 }}
                      transition={{ ease: 'linear', duration: 0.08 }}
                      style={{ width: '100%' }}
                    />
                  </div>
                </motion.div>
              )}

              {step === 'thankyou' && (
                <motion.div
                  key="thankyou"
                  className={styles.thankyou}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reduced ? 0 : 0.35 }}
                  role="status"
                >
                  <img
                    src="/images/dopa-treats-logo.jpg"
                    alt="DOPA TREATS — Your daily dose of joy"
                    className={styles.thankyouLogo}
                  />
                  <p className={styles.thankyouMessage}>
                    Thank you, please come back!
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  className={styles.success}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reduced ? 0 : 0.35 }}
                >
                  <motion.div
                    className={styles.successBurst}
                    initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    {!reduced && (
                      <motion.span
                        className={styles.successRing}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        aria-hidden
                      />
                    )}
                    <CheckCircle size={72} className={styles.successIcon} aria-hidden />
                  </motion.div>
                  <span className={styles.mockBadge}>Demo order</span>
                  <h2 className={styles.successTitle}>Thank you!</h2>
                  <p className={styles.orderId}>{orderId ?? lastReceipt?.id}</p>
                  <p className={styles.successSubtitle}>
                    Your order is confirmed. Pick up at Tabuan sa DNSC, New
                    Visayas — this was a mock payment with no real charges.
                  </p>
                  <Button size="lg" className={styles.doneBtn} onClick={handleClose}>
                    Back to menu
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {step === 'form' && (
            <footer className={styles.footer}>
              <div className={styles.footerInner}>
                <div className={styles.footerActions}>
                  <Button
                    type="button"
                    size="lg"
                    className={styles.payBtn}
                    disabled={lines.length === 0}
                    onClick={handleDemoPay}
                  >
                    <>
                      <CreditCard size={18} aria-hidden />
                      Demo Pay {formatPrice(subtotal)}
                    </>
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="secondary"
                    className={styles.payBtnSecondary}
                    disabled={!canPay}
                    onClick={handlePay}
                  >
                    Pay with card details
                  </Button>
                </div>
                <p className={styles.mockNote}>
                  One-tap demo — test card is pre-filled. No real charges.
                </p>
              </div>
            </footer>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
