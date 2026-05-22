import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Send, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './Feedback.module.css';

const RATINGS = [1, 2, 3, 4, 5] as const;

export function Feedback() {
  const reduced = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('DOPA TREATS — Customer Feedback');
    const body = encodeURIComponent(
      [
        `Name: ${name || 'Anonymous'}`,
        email ? `Email: ${email}` : '',
        rating ? `Rating: ${rating}/5` : '',
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    window.open(`mailto:09933347563?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
  };

  return (
    <section id="feedback" className={styles.feedback}>
      <div className="container">
        <motion.header
          className={styles.header}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">We&apos;d love to hear from you</span>
          <h2 className="section-heading">
            Share your <span className="gradient-text">feedback</span>
          </h2>
          <p className={styles.subtitle}>
            Tell us about your visit, your favorite treat, or how we can make
            your next dose of joy even better.
          </p>
        </motion.header>

        <motion.div
          className={styles.card}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {submitted ? (
            <div className={styles.success}>
              <MessageCircle size={40} className={styles.successIcon} aria-hidden />
              <h3 className={styles.successTitle}>Thank you!</h3>
              <p className={styles.successText}>
                Your feedback means a lot to us. If your email app opened,
                send the message when you&apos;re ready — or visit us again at
                Tabuan sa DNSC.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setRating(null);
                  setMessage('');
                }}
              >
                Send another response
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={styles.input}
                    autoComplete="name"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Email (optional)</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={styles.input}
                    autoComplete="email"
                  />
                </label>
              </div>

              <fieldset className={styles.ratingField}>
                <legend className={styles.label}>How was your experience?</legend>
                <div className={styles.stars} role="group" aria-label="Rating">
                  {RATINGS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.starBtn} ${rating !== null && value <= rating ? styles.starActive : ''}`}
                      onClick={() => setRating(value)}
                      aria-label={`${value} star${value > 1 ? 's' : ''}`}
                      aria-pressed={rating === value}
                    >
                      <Star size={28} fill={rating !== null && value <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className={styles.field}>
                <span className={styles.label}>Your message</span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What did you love? What can we improve?"
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </label>

              <Button type="submit" size="lg" className={styles.submit}>
                <>
                  <Send size={18} aria-hidden />
                  Send feedback
                </>
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
