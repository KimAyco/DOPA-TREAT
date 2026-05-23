import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { CONTACT } from '../../data/menu';
import styles from './Hero.module.css';

const floatingItems = [
  {
    src: '/images/coffee-jelly.jpg',
    alt: 'Coffee jelly dessert in cups',
    className: styles.float1,
    duration: 5.5,
    animate: {
      y: [0, -18, 8, -12, 0],
      x: [0, 12, -8, 6, 0],
      rotate: [-8, -4, -11, -6, -8],
    },
  },
  {
    src: '/images/salad.jpg',
    alt: 'Cucumber salad',
    className: styles.float2,
    duration: 6.2,
    animate: {
      y: [0, 12, -8, 14, 0],
      x: [0, 8, -6, 10, 0],
      rotate: [-6, -2, -9, -4, -6],
    },
  },
  {
    src: '/images/drink.jpg',
    alt: 'Smoothie',
    className: styles.float3,
    duration: 4.8,
    animate: {
      y: [0, -10, 12, -6, 0],
      x: [0, -14, 8, -10, 0],
      rotate: [4, 8, 0, 6, 4],
    },
  },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.mesh} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <motion.div
            className={styles.badge}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} aria-hidden />
            <span>Fresh · Local · Joyful</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Your daily
            <br />
            <span className={styles.titleAccent}>dose of joy</span>
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Crispy fried tofu, refreshing salads, jelly graham cake, and
            ice-cold drinks — crafted with love at DOPA TREATS.
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Button href="#menu" size="lg">
              <>
                Explore Menu
                <ArrowRight size={18} aria-hidden />
              </>
            </Button>
            <Button variant="ghost" href={CONTACT.phoneTel} size="lg">
              Call to Order
            </Button>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className={styles.stat}>
              <strong>₱10+</strong>
              <span>Affordable drinks</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>4+</strong>
              <span>Menu categories</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>DNSC</strong>
              <span>Tabuan location</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              src="/images/character.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/images/mascot.jpg"
              aria-label="DOPA TREATS mascot waving"
            />
          </div>

          {floatingItems.map((item, i) => (
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={`${styles.floatImg} ${item.className}`}
              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, ...item.animate }
              }
              transition={
                reduced
                  ? { delay: 0.4 + i * 0.1, duration: 0.5 }
                  : {
                      opacity: { delay: 0.4 + i * 0.1, duration: 0.5 },
                      scale: { delay: 0.4 + i * 0.1, duration: 0.5 },
                      y: {
                        duration: item.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      },
                      x: {
                        duration: item.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      },
                      rotate: {
                        duration: item.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      },
                    }
              }
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
