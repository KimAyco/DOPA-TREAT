import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from 'framer-motion';
import styles from './MenuScrollStack.module.css';

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = useContext(ContainerScrollContext);
  if (!context) {
    throw new Error('Menu scroll stack must be used inside ContainerScroll');
  }
  return context;
}

interface ContainerScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ContainerScroll({ children, className = '', ...props }: ContainerScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end end'],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={`${styles.containerScroll} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
}

interface CardsContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardsContainer({ children, className = '', ...props }: CardsContainerProps) {
  return (
    <div
      className={`${styles.cardsContainer} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTransformedProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  /** Number of cards in the stack */
  arrayLength: number;
  /** Stack index (reference uses index + 2) */
  index: number;
  incrementY?: number;
  incrementZ?: number;
  incrementRotation?: number;
}

export function CardTransformed({
  children,
  arrayLength,
  index,
  incrementY = 10,
  incrementZ = 10,
  incrementRotation = -index + 90,
  className = '',
  style,
  ...props
}: CardTransformedProps) {
  const { scrollYProgress } = useContainerScrollContext();

  const start = index / (arrayLength + 1);
  const end = (index + 1) / (arrayLength + 1);
  const range = useMemo<[number, number]>(() => [start, end], [start, end]);
  const rotateRange = useMemo<[number, number]>(
    () => [range[0] - 1.5, range[1] / 1.5],
    [range],
  );

  const y = useTransform(scrollYProgress, range, ['0%', '-180%']);
  const rotate = useTransform(scrollYProgress, rotateRange, [
    incrementRotation,
    0,
  ]);

  /* Front card = first menu item (lowest index). Higher stackLayer = closer to viewer. */
  const stackLayer = arrayLength + 2 - index;
  const stackDepth = stackLayer * incrementZ;
  const stackTop = (index - 2) * incrementY;

  const transform = useMotionTemplate`translateZ(${stackDepth}px) translateY(${y}) rotate(${rotate}deg)`;

  const dx = useTransform(scrollYProgress, rotateRange, [4, 0]);
  const dy = useTransform(scrollYProgress, rotateRange, [4, 12]);
  const blur = useTransform(scrollYProgress, rotateRange, [2, 24]);
  const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2]);
  const filter = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`;

  return (
    <motion.div
      className={`${styles.cardTransformed} ${className}`.trim()}
      style={{
        top: stackTop,
        left: 0,
        right: 0,
        bottom: 0,
        transform,
        backfaceVisibility: 'hidden',
        zIndex: stackLayer * incrementZ,
        filter,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
