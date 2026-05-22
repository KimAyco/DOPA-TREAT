import styles from './WaveDivider.module.css';

interface WaveDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({
  fill = 'var(--red)',
  flip = false,
  className = '',
}: WaveDividerProps) {
  return (
    <div
      className={`${styles.wrapper} ${flip ? styles.flip : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
      <div className={styles.torn} style={{ background: fill }} />
    </div>
  );
}
