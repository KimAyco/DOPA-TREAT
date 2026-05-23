export interface PriceSize {
  label: string;
  price: string;
}

export interface MenuItem {
  name: string;
  price?: string;
  sizes?: PriceSize[];
  note?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  layout: 'hero' | 'compact' | 'wide';
  items: MenuItem[];
  /** Shown on stack card instead of item list (full menu still opens on tap) */
  stackHint?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'fried-tofu',
    title: 'DOPA TREAT MENU',
    tagline: 'Fried tofu, salads, jelly graham cake & drinks',
    image: '/images/tofu.jpg',
    imageAlt: 'DOPA TREATS menu — fried tofu in branded cups',
    layout: 'hero',
    stackHint: 'See menu — scroll down',
    items: [
      { name: 'Creamy', price: '₱35' },
      { name: 'Creamy Chili', price: '₱35' },
      { name: 'Chili Garlic', price: '₱35' },
    ],
  },
  {
    id: 'cucumber-salad',
    title: 'Cucumber Salad',
    tagline: 'Light, fresh, and perfectly topped',
    image: '/images/salad.jpg',
    imageAlt: 'Cucumber slices topped with tuna mayo',
    layout: 'compact',
    items: [{ name: 'Tuna Mayo', price: '₱30' }],
  },
  {
    id: 'cheesy-tofu',
    title: 'Fried Tofu',
    tagline: 'Golden cubes with bold, savory sauces',
    image: '/images/gallery-1.jpg',
    imageAlt: 'Spicy crispy and creamy chili fried tofu',
    layout: 'compact',
    items: [
      { name: 'Spicy Crispy', price: '₱35' },
      { name: 'Creamy Chili', price: '₱35' },
      { name: 'Chili Garlic', price: '₱35' },
    ],
  },
  {
    id: 'graham-cake',
    title: 'Jelly Graham cake',
    tagline: 'Creamy graham layers with glossy jelly cubes',
    image: '/images/jelly-graham-cake.jpg',
    imageAlt: 'Jelly Graham cake in cups from DOPA TREATS',
    layout: 'compact',
    items: [{ name: 'Jelly Graham cake', price: '₱35' }],
  },
  {
    id: 'drinks',
    title: 'Lemon Turmeric Juice',
    tagline: 'Bright, zesty refreshment — two sizes',
    image: '/images/drink.jpg',
    imageAlt: 'Refreshing lemon turmeric juice with ice',
    layout: 'wide',
    items: [
      {
        name: 'Lemon Turmeric Juice',
        sizes: [
          { label: '8oz', price: '₱10' },
          { label: '12oz', price: '₱15' },
        ],
      },
    ],
  },
  {
    id: 'squash-smoothie',
    title: 'Squash Smoothie',
    tagline: 'Golden, creamy squash blended smooth',
    image: '/images/squash-smoothie.jpg',
    imageAlt: 'Squash smoothie in cups from DOPA TREATS',
    layout: 'wide',
    items: [
      {
        name: 'Squash Smoothie',
        sizes: [
          { label: '8oz', price: '₱10' },
          { label: '12oz', price: '₱15' },
        ],
      },
    ],
  },
];

export type GalleryLayout = 'hero' | 'accent' | 'standard';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  layout: GalleryLayout;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'tofu',
    src: '/images/tofu.jpg',
    alt: 'Cheesy fried tofu in DOPA TREATS cups',
    label: 'Fried Tofu',
    layout: 'hero',
  },
  {
    id: 'salad',
    src: '/images/salad.jpg',
    alt: 'Fresh cucumber salad appetizers',
    label: 'Cucumber Salad',
    layout: 'accent',
  },
  {
    id: 'drink',
    src: '/images/squash-smoothie.jpg',
    alt: 'Golden squash smoothie in cups',
    label: 'Squash Smoothie',
    layout: 'accent',
  },
  {
    id: 'spread-1',
    src: '/images/jelly-graham-cake.jpg',
    alt: 'Jelly graham cake',
    label: 'jelly graham cake',
    layout: 'standard',
  },
  {
    id: 'spread-2',
    src: '/images/lemon-turmeric-juice.jpg',
    alt: 'Lemon turmeric juice with ice',
    label: 'lemon turmeric juice',
    layout: 'standard',
  },
];

export const CONTACT = {
  location: 'Davao del Norte State College, Panabo City, Philippines',
  locationShort: 'Tabuan sa DNSC, New Visayas',
  phone: '09123456789',
  phoneTel: 'tel:09123456789',
  mapsQuery: 'Davao del Norte State College, Panabo City, Philippines',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Davao+del+Norte+State+College%2C+Panabo+City%2C+Philippines',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Davao+del+Norte+State+College%2C+Panabo+City%2C+Philippines&z=16&output=embed',
};
