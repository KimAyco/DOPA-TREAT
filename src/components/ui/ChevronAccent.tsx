import { ChevronsRight } from 'lucide-react';
import styles from './ChevronAccent.module.css';

interface ChevronAccentProps {
  light?: boolean;
}

export function ChevronAccent({ light = true }: ChevronAccentProps) {
  return (
    <div
      className={`${styles.accent} ${light ? styles.light : styles.dark}`}
      aria-hidden="true"
    >
      <ChevronsRight size={28} strokeWidth={3} />
      <ChevronsRight size={28} strokeWidth={3} />
    </div>
  );
}
