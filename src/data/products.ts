export type SectionId = "featured" | "new" | "value";

export type Product = {
  id: number;
  name: string;
  category: string;
  material: string;
  fit: "Universal" | "Custom";
  weather: "Mild" | "All-Weather" | "Extreme";
  price: number;
  rating: number;
  section: SectionId;
  inStock: boolean;
  images: string[]; // updated to support multiple images
};

export const IMAGE_FALLBACK =
  "https://placehold.co/1200x900/e2e8f0/0f172a?text=CoverGard+Example";
export const HERO_IMAGE = "https://picsum.photos/seed/covergard-hero/1400/1000";

// Helper to generate multiple images per product
function exampleProductImages(id: number, count: number = 3): string[] {
  return Array.from({ length: count }, (_, index) =>
    `https://picsum.photos/seed/covergard-product-${id}-${index}/1200/900`
  );
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "PatioGuard Premium L-Set Cover",
    category: "Patio Furniture",
    material: "Solution-Dyed Polyester",
    fit: "Custom",
    weather: "Extreme",
    price: 189,
    rating: 4.9,
    section: "featured",
    inStock: true,
    images: exampleProductImages(1),
  },
  {
    id: 2,
    name: "StormShield 4 Burner Gas Braai Cover",
    category: "Gas Braai",
    material: "PVC-Coated Oxford",
    fit: "Custom",
    weather: "All-Weather",
    price: 119,
    rating: 4.8,
    section: "featured",
    inStock: true,
    images: exampleProductImages(2),
  },
  {
    id: 3,
    name: "RattanSafe Outdoor Lounge Cover",
    category: "Lounge Set",
    material: "Ripstop Polyester",
    fit: "Universal",
    weather: "All-Weather",
    price: 98,
    rating: 4.6,
    section: "featured",
    inStock: true,
    images: exampleProductImages(3),
  },
  {
    id: 4,
    name: "Braai Pro Cart Cover",
    category: "Gas Braai",
    material: "Solution-Dyed Polyester",
    fit: "Universal",
    weather: "Extreme",
    price: 142,
    rating: 4.7,
    section: "featured",
    inStock: false,
    images: exampleProductImages(4),
  },
  {
    id: 5,
    name: "Deck Dining 8-Seater Shield",
    category: "Outdoor Dining",
    material: "PVC-Coated Oxford",
    fit: "Custom",
    weather: "Extreme",
    price: 176,
    rating: 4.8,
    section: "new",
    inStock: true,
    images: exampleProductImages(5),
  },
  {
    id: 6,
    name: "Pergola Sofa Slip Cover",
    category: "Patio Furniture",
    material: "Ripstop Polyester",
    fit: "Custom",
    weather: "All-Weather",
    price: 155,
    rating: 4.5,
    section: "new",
    inStock: true,
    images: exampleProductImages(6),
  },
  {
    id: 7,
    name: "Compact Braai Weekend Cover",
    category: "Gas Braai",
    material: "PVC-Coated Oxford",
    fit: "Universal",
    weather: "Mild",
    price: 79,
    rating: 4.3,
    section: "new",
    inStock: true,
    images: exampleProductImages(7),
  },
  {
    id: 8,
    name: "Fire Pit Ring Defender",
    category: "Fire Pit",
    material: "Solution-Dyed Polyester",
    fit: "Universal",
    weather: "All-Weather",
    price: 88,
    rating: 4.4,
    section: "new",
    inStock: true,
    images: exampleProductImages(8),
  },
  {
    id: 9,
    name: "Garden Bench Everyday Cover",
    category: "Garden Bench",
    material: "Ripstop Polyester",
    fit: "Universal",
    weather: "Mild",
    price: 49,
    rating: 4.1,
    section: "value",
    inStock: true,
    images: exampleProductImages(9),
  },
  {
    id: 10,
    name: "Twin Chair Cover Set",
    category: "Patio Furniture",
    material: "PVC-Coated Oxford",
    fit: "Universal",
    weather: "All-Weather",
    price: 57,
    rating: 4.2,
    section: "value",
    inStock: true,
    images: exampleProductImages(10),
  },
  {
    id: 11,
    name: "Entry Braai Basic Shell",
    category: "Gas Braai",
    material: "Ripstop Polyester",
    fit: "Universal",
    weather: "Mild",
    price: 45,
    rating: 3.9,
    section: "value",
    inStock: true,
    images: exampleProductImages(11),
  },
  {
    id: 12,
    name: "Stackable Stool Pack Cover",
    category: "Outdoor Dining",
    material: "Solution-Dyed Polyester",
    fit: "Universal",
    weather: "Mild",
    price: 42,
    rating: 4,
    section: "value",
    inStock: false,
    images: exampleProductImages(12),
  },
  {
    id: 13,
    name: "Courtyard Sofa Full-Length Cover",
    category: "Patio Furniture",
    material: "Solution-Dyed Polyester",
    fit: "Custom",
    weather: "All-Weather",
    price: 164,
    rating: 4.7,
    section: "featured",
    inStock: true,
    images: exampleProductImages(13),
  },
  {
    id: 14,
    name: "Braai Master Deluxe Hood Cover",
    category: "Gas Braai",
    material: "PVC-Coated Oxford",
    fit: "Custom",
    weather: "Extreme",
    price: 136,
    rating: 4.8,
    section: "featured",
    inStock: true,
    images: exampleProductImages(14),
  },
  {
    id: 15,
    name: "Outdoor Bistro Set Weather Cover",
    category: "Outdoor Dining",
    material: "Ripstop Polyester",
    fit: "Universal",
    weather: "All-Weather",
    price: 93,
    rating: 4.4,
    section: "new",
    inStock: true,
    images: exampleProductImages(15),
  },
  {
    id: 16,
    name: "Patio Corner Lounge Shield",
    category: "Lounge Set",
    material: "Solution-Dyed Polyester",
    fit: "Custom",
    weather: "Extreme",
    price: 172,
    rating: 4.7,
    section: "new",
    inStock: true,
    images: exampleProductImages(16),
  },
  {
    id: 17,
    name: "Braai Compact Everyday Cover",
    category: "Gas Braai",
    material: "Ripstop Polyester",
    fit: "Universal",
    weather: "Mild",
    price: 52,
    rating: 4.1,
    section: "value",
    inStock: true,
    images: exampleProductImages(17),
  },
  {
    id: 18,
    name: "Garden Chair Duo Protection Set",
    category: "Patio Furniture",
    material: "PVC-Coated Oxford",
    fit: "Universal",
    weather: "Mild",
    price: 47,
    rating: 4,
    section: "value",
    inStock: true,
    images: exampleProductImages(18),
  },
];

export const SECTION_META: Array<{
  id: SectionId;
  title: string;
  description: string;
}> = [
  {
    id: "featured",
    title: "Featured For This Season",
    description: "Best-selling covers for patios, braais, and outdoor lounges.",
  },
  {
    id: "new",
    title: "New Arrivals",
    description: "Fresh stock with improved seams and UV-resistant coatings.",
  },
  {
    id: "value",
    title: "Everyday Value",
    description: "Strong everyday protection at practical prices.",
  },
];

export const CATEGORY_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.category)));
export const MATERIAL_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.material)));
export const FIT_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.fit)));
export const WEATHER_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.weather)));

export const PRICE_LIMITS = PRODUCTS.reduce(
  (limits, product) => ({
    min: Math.min(limits.min, product.price),
    max: Math.max(limits.max, product.price),
  }),
  { min: Number.POSITIVE_INFINITY, max: 0 },
);
