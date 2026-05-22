export function parsePrice(price: string): number {
  const digits = price.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function formatPrice(amount: number): string {
  return `₱${amount}`;
}
