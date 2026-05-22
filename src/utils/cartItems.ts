import type { MenuCategory, MenuItem } from '../data/menu';
import type { AddItemInput } from '../context/CartContext';

export function menuItemToCartInputs(
  category: MenuCategory,
  item: MenuItem,
  sizeLabel?: string,
): AddItemInput[] {
  if (item.sizes?.length) {
    const size = sizeLabel
      ? item.sizes.find((s) => s.label.toLowerCase() === sizeLabel.toLowerCase())
      : item.sizes[0];
    if (!size) return [];
    return [
      {
        categoryTitle: category.title,
        name: item.name,
        size: size.label,
        priceLabel: size.price,
      },
    ];
  }

  if (!item.price) return [];

  return [
    {
      categoryTitle: category.title,
      name: item.name,
      priceLabel: item.price,
    },
  ];
}

export function categoryToCartInputs(category: MenuCategory): AddItemInput[] {
  return category.items.flatMap((item) => menuItemToCartInputs(category, item));
}
