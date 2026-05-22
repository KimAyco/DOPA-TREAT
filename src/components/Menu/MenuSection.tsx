import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { menuCategories } from '../../data/menu';
import type { MenuCategory } from '../../data/menu';
import { MenuCard } from './MenuCard';
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from './MenuScrollStack';
import { MenuDetailModal } from './MenuDetailModal';
import { MenuStackCard } from './MenuStackCard';
import styles from './MenuSection.module.css';

export function MenuSection() {
  const reduced = useReducedMotion();
  const count = menuCategories.length;
  const [openCategory, setOpenCategory] = useState<MenuCategory | null>(null);

  return (
    <section id="menu" className={styles.menu}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.headerWrap}`}>
        <motion.header
          className={styles.header}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label" style={{ color: 'var(--gold)' }}>
            What we serve
          </span>
          <h2 className={`section-heading ${styles.title}`}>
            The <span className="gradient-text">Menu</span>
          </h2>
          <p className={styles.subtitle}>
            Bold flavors, student-friendly prices. Scroll the stack, then tap a
            card to open the full menu.
          </p>
          {!reduced && (
            <p className={styles.scrollHint}>
              <ChevronDown size={18} aria-hidden />
              Scroll to explore
            </p>
          )}
        </motion.header>
      </div>

      {reduced ? (
        <div className={`container ${styles.inner}`}>
          <div className={styles.grid}>
            {menuCategories.map((cat, i) => (
              <MenuCard
                key={cat.id}
                category={cat}
                index={i}
                onOpen={() => setOpenCategory(cat)}
              />
            ))}
          </div>
        </div>
      ) : (
        <ContainerScroll>
          <div className={styles.stickyViewport}>
            <CardsContainer>
              {menuCategories.map((category, index) => (
                <CardTransformed
                  key={category.id}
                  arrayLength={count}
                  index={index + 2}
                  aria-label={category.title}
                >
                  <MenuStackCard
                    category={category}
                    layoutId={
                      reduced ? undefined : `menu-card-${category.id}`
                    }
                    onOpen={() => setOpenCategory(category)}
                  />
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      )}

      <MenuDetailModal
        category={openCategory}
        onClose={() => setOpenCategory(null)}
      />
    </section>
  );
}
