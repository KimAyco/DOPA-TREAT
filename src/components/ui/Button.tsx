import type { ReactNode, MouseEventHandler } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  size?: 'md' | 'lg';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  className = '',
  size = 'md',
  disabled = false,
}: ButtonProps) {
  const cls = `${styles.button} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-disabled={disabled}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
