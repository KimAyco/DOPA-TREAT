import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { parsePrice } from '../utils/price';

export interface CartLine {
  id: string;
  categoryTitle: string;
  name: string;
  size?: string;
  priceLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface AddItemInput {
  categoryTitle: string;
  name: string;
  size?: string;
  priceLabel: string;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  lastOrderId: string | null;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addItem: (input: AddItemInput, quantity?: number) => void;
  addItems: (inputs: AddItemInput[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
  completeOrder: () => string;
  dismissOrderSuccess: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function lineId(name: string, size?: string) {
  return `${name}::${size ?? ''}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const addItem = useCallback((input: AddItemInput, quantity = 1) => {
    const id = lineId(input.name, input.size);
    const unitPrice = parsePrice(input.priceLabel);

    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [
        ...prev,
        {
          id,
          categoryTitle: input.categoryTitle,
          name: input.name,
          size: input.size,
          priceLabel: input.priceLabel,
          unitPrice,
          quantity,
        },
      ];
    });
  }, []);

  const addItems = useCallback(
    (inputs: AddItemInput[]) => {
      inputs.forEach((input) => addItem(input, 1));
    },
    [addItem],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity } : l)),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const completeOrder = useCallback(() => {
    const orderId = `DT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setLastOrderId(orderId);
    setLines([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    return orderId;
  }, []);

  const dismissOrderSuccess = useCallback(() => setLastOrderId(null), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      isCartOpen,
      isCheckoutOpen,
      lastOrderId,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      openCheckout: () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
      },
      closeCheckout: () => setIsCheckoutOpen(false),
      addItem,
      addItems,
      updateQuantity,
      removeLine,
      clearCart,
      completeOrder,
      dismissOrderSuccess,
    }),
    [
      lines,
      itemCount,
      subtotal,
      isCartOpen,
      isCheckoutOpen,
      lastOrderId,
      addItem,
      addItems,
      updateQuantity,
      removeLine,
      clearCart,
      completeOrder,
      dismissOrderSuccess,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
