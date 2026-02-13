import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Link } from "react-router-dom";

type SectionId = "featured" | "new" | "value";
type SortBy = "featured" | "price-asc" | "price-desc" | "rating-desc";

type Product = {
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
  image: string;
};

type SpecialRequestForm = {
  length: string;
  height: string;
  width: string;
  fabric: string;
  color: string;
  coverOption: string;
};

const IMAGE_FALLBACK = "https://placehold.co/1200x900/e2e8f0/0f172a?text=CoverGard+Example";
const HERO_IMAGE = "https://picsum.photos/seed/covergard-hero/1400/1000";

function exampleProductImage(id: number): string {
  return `https://picsum.photos/seed/covergard-product-${id}/1200/900`;
}

const PRODUCTS: Product[] = [
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
    image: exampleProductImage(1),
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
    image: exampleProductImage(2),
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
    image: exampleProductImage(3),
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
    image: exampleProductImage(4),
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
    image: exampleProductImage(5),
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
    image: exampleProductImage(6),
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
    image: exampleProductImage(7),
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
    image: exampleProductImage(8),
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
    image: exampleProductImage(9),
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
    image: exampleProductImage(10),
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
    image: exampleProductImage(11),
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
    image: exampleProductImage(12),
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
    image: exampleProductImage(13),
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
    image: exampleProductImage(14),
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
    image: exampleProductImage(15),
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
    image: exampleProductImage(16),
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
    image: exampleProductImage(17),
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
    image: exampleProductImage(18),
  },
];

const SECTION_META: Array<{
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

const CATEGORY_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.category)));
const MATERIAL_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.material)));
const FIT_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.fit)));
const WEATHER_OPTIONS = Array.from(new Set(PRODUCTS.map((product) => product.weather)));
const SPECIAL_FABRIC_OPTIONS = [
  "Ripstop Polyester",
  "PVC-Coated Oxford",
  "Solution-Dyed Polyester",
  "Marine Canvas",
];
const SPECIAL_COLOR_OPTIONS = ["Charcoal", "Forest Green", "Sandstone", "Navy", "Stone Grey"];
const SPECIAL_COVER_OPTIONS = [
  "Patio Furniture Cover",
  "Gas Braai Cover",
  "Outdoor Dining Set Cover",
  "Fire Pit Cover",
  "Custom Shape Cover",
];
const SPECIAL_SELECT_CLASS =
  "w-full appearance-none rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition duration-200 hover:border-emerald-300 hover:bg-emerald-50/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 max-[360px]:px-2.5 max-[360px]:py-2 max-[360px]:pr-9 max-[360px]:text-[13px]";
const FILTER_SELECT_CLASS = SPECIAL_SELECT_CLASS;

const PRICE_LIMITS = PRODUCTS.reduce(
  (limits, product) => ({
    min: Math.min(limits.min, product.price),
    max: Math.max(limits.max, product.price),
  }),
  { min: Number.POSITIVE_INFINITY, max: 0 },
);

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

function toggleSelection(current: string[], value: string): string[] {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }

  return [...current, value];
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const rotateClass = direction === "left" ? "rotate-180" : "";

  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${rotateClass}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function SelectCaretIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

function FilterMenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={
          "absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 " +
          (open ? "translate-y-[7px] rotate-45" : "")
        }
      />
      <span
        className={
          "absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 " +
          (open ? "opacity-0" : "")
        }
      />
      <span
        className={
          "absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 " +
          (open ? "-translate-y-[7px] -rotate-45" : "")
        }
      />
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block h-full w-full"
    >
      <article className="flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-emerald-100/80 bg-white shadow-md transition duration-500 hover:-translate-y-1.5 hover:shadow-xl">
        <div className="relative h-44 overflow-hidden min-[380px]:h-48 sm:h-52 min-[860px]:h-40">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(event) => {
              const target = event.currentTarget;
              if (target.dataset.fallbackApplied === "true") return;
              target.dataset.fallbackApplied = "true";
              target.src = IMAGE_FALLBACK;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 min-[380px]:left-3 min-[380px]:top-3 min-[380px]:px-3 min-[380px]:text-[11px]">
            {product.category}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col space-y-2 p-3 text-left min-[380px]:p-3.5 sm:space-y-2.5 sm:p-4">
          <h3 className="line-clamp-2 text-[13px] font-bold leading-5 text-slate-900 min-[380px]:text-sm">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 min-[380px]:text-xs">{product.material}</p>
          <div className="flex flex-wrap gap-1.5 min-[380px]:gap-2">
            <span className="max-w-full break-words rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 min-[380px]:px-2.5 min-[380px]:text-[11px]">
              {product.fit} Fit
            </span>
            <span className="max-w-full break-words rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 min-[380px]:px-2.5 min-[380px]:text-[11px]">
              {product.weather}
            </span>
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="text-[15px] font-extrabold text-slate-950 min-[380px]:text-base sm:text-lg">
              ${product.price}
            </p>
            <p className="text-xs font-semibold text-amber-500 min-[380px]:text-sm">
              {product.rating.toFixed(1)} ★
            </p>
          </div>
          <p
            className={
              product.inStock
                ? "text-[11px] font-semibold text-emerald-600 min-[380px]:text-xs"
                : "text-[11px] font-semibold text-rose-500 min-[380px]:text-xs"
            }
          >
            {product.inStock ? "In stock" : "Back soon"}
          </p>
        </div>
      </article>
    </Link>
  );
}

function ProductCarousel({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: Product[];
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(products.length > 1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 0);

  const updateScrollControls = useCallback(() => {
    if (!trackRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    const edgeOffset = 8;
    const hasTrackOverflow = maxScrollLeft > edgeOffset;

    setHasOverflow(hasTrackOverflow);
    setCanScrollLeft(hasTrackOverflow && scrollLeft > edgeOffset);
    setCanScrollRight(hasTrackOverflow && maxScrollLeft - scrollLeft > edgeOffset);
  }, []);

  const scrollTrack = (direction: number) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const computed = window.getComputedStyle(track);
    const gap = Number.parseFloat(computed.columnGap || computed.gap || "0");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? track.clientWidth * 0.86;
    const distance = Math.floor(cardWidth + gap) * direction;

    track.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Recalculate once layout is painted and whenever size changes.
    const frameId = requestAnimationFrame(updateScrollControls);
    const secondFrameId = requestAnimationFrame(updateScrollControls);

    const handleScroll = () => updateScrollControls();
    const resizeObserver = new ResizeObserver(() => updateScrollControls());

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    resizeObserver.observe(track);

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(secondFrameId);
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
    };
  }, [products.length, updateScrollControls]);

  return (
    <section className="rounded-3xl border border-white/70 bg-white/85 p-3 shadow-sm backdrop-blur-sm max-[360px]:rounded-2xl max-[360px]:p-2.5 sm:p-6">
      <div className="flex min-w-0 flex-col gap-3 min-[860px]:flex-row min-[860px]:flex-wrap min-[860px]:items-center min-[860px]:justify-between min-[860px]:gap-4">
        <div className="space-y-1">
          <h2 className="text-[15px] font-bold text-slate-900 min-[860px]:text-xl">{title}</h2>
          <p className="text-xs text-slate-600 min-[860px]:text-sm">{description}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 min-[860px]:w-auto min-[860px]:justify-end min-[860px]:gap-3">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 min-[380px]:text-[11px] min-[860px]:px-3 min-[860px]:text-xs">
            {products.length} items
          </span>
          <div className="hidden items-center gap-1.5 min-[860px]:flex min-[860px]:gap-2">
            <button
              type="button"
              className={
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition duration-300 max-[360px]:h-7 max-[360px]:w-7 min-[860px]:h-11 min-[860px]:w-11 min-[860px]:rounded-xl " +
                (canScrollLeft
                  ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/70 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-300/70 active:translate-y-0"
                  : "border-slate-400/50 bg-slate-700 text-white/85")
              }
              onClick={() => scrollTrack(-1)}
              aria-label={`Scroll ${title} left`}
              disabled={!canScrollLeft}
            >
              <span className="mx-auto flex items-center justify-center">
                <ChevronIcon direction="left" />
              </span>
            </button>
            <button
              type="button"
              className={
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition duration-300 max-[360px]:h-7 max-[360px]:w-7 min-[860px]:h-11 min-[860px]:w-11 min-[860px]:rounded-xl " +
                (canScrollRight
                  ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/70 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-300/70 active:translate-y-0"
                  : "border-slate-400/50 bg-slate-700 text-white/85")
              }
              onClick={() => scrollTrack(1)}
              aria-label={`Scroll ${title} right`}
              disabled={!canScrollRight}
            >
              <span className="mx-auto flex items-center justify-center">
                <ChevronIcon direction="right" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="mt-4 overflow-hidden">
          <div
            ref={trackRef}
            className="product-scrollbar grid grid-cols-1 gap-3 pb-1 min-[520px]:grid-cols-2 min-[860px]:flex min-[860px]:snap-x min-[860px]:snap-mandatory min-[860px]:gap-4 min-[860px]:overflow-x-auto min-[860px]:px-1 min-[860px]:pb-2"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 min-[860px]:snap-start min-[860px]:shrink-0 min-[860px]:basis-[calc((100%-1rem)/2)] min-[1200px]:basis-[calc((100%-2rem)/3)] min-[1440px]:basis-[calc((100%-3rem)/4)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          No products match this filter set in this collection.
        </div>
      )}

      {products.length > 0 && !hasOverflow ? (
        <p className="mt-4 hidden text-xs font-medium text-slate-500 min-[860px]:block">
          All items fit in view. Use filters to narrow this collection.
        </p>
      ) : null}
    </section>
  );
}

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(PRICE_LIMITS.min);
  const [maxPrice, setMaxPrice] = useState(PRICE_LIMITS.max);
  const [minimumRating, setMinimumRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [specialRequest, setSpecialRequest] = useState<SpecialRequestForm>({
    length: "",
    height: "",
    width: "",
    fabric: SPECIAL_FABRIC_OPTIONS[0],
    color: SPECIAL_COLOR_OPTIONS[0],
    coverOption: SPECIAL_COVER_OPTIONS[0],
  });
  const [specialSubmitted, setSpecialSubmitted] = useState(false);

  useEffect(() => {
    const observed = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observed.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const matchingProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      const matchesQuery =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesMaterial =
        selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      const matchesFit = selectedFits.length === 0 || selectedFits.includes(product.fit);
      const matchesWeather =
        selectedWeather.length === 0 || selectedWeather.includes(product.weather);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesRating = product.rating >= minimumRating;
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesMaterial &&
        matchesFit &&
        matchesWeather &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating-desc") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [
    searchText,
    selectedCategories,
    selectedMaterials,
    selectedFits,
    selectedWeather,
    minPrice,
    maxPrice,
    minimumRating,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedFits([]);
    setSelectedWeather([]);
    setMinPrice(PRICE_LIMITS.min);
    setMaxPrice(PRICE_LIMITS.max);
    setMinimumRating(0);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const updateSpecialField = (field: keyof SpecialRequestForm, value: string) => {
    setSpecialRequest((current) => ({ ...current, [field]: value }));
    if (specialSubmitted) setSpecialSubmitted(false);
  };

  const handleSpecialSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpecialSubmitted(true);
  };

  return (
    <main className="w-full overflow-x-hidden pb-14">
      <section className="relative overflow-hidden bg-slate-950 py-6 sm:py-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.38),transparent_36%),radial-gradient(circle_at_86%_13%,rgba(250,204,21,0.22),transparent_30%),radial-gradient(circle_at_55%_100%,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-1.5 min-[380px]:px-2 sm:px-6 lg:px-14">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <article
              data-reveal
              className="reveal flex min-h-[360px] flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.08] p-5 text-white shadow-2xl backdrop-blur-md max-[360px]:rounded-2xl max-[360px]:p-3.5 sm:min-h-[420px] sm:p-9"
            >
              <div>
                <p className="mb-4 inline-block rounded-full border border-emerald-300/50 bg-emerald-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 max-[360px]:px-2.5 max-[360px]:text-[11px] max-[360px]:tracking-[0.09em]">
                  CoverGard Outdoor Collection
                </p>
                <h1 className="max-w-3xl text-2xl font-extrabold leading-tight max-[360px]:text-[1.42rem] sm:text-5xl lg:text-[3.4rem]">
                  Patio and Gas Braai Covers Built to Fit and Last
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                  Protect every outdoor setup with weather-tested covers for patio furniture,
                  braais, benches, and more. Filter quickly, browse by collection, and order with
                  confidence.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#catalog"
                    className="w-full rounded-full bg-emerald-400 px-6 py-2.5 text-center text-sm font-bold text-emerald-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 max-[360px]:px-4 max-[360px]:text-[13px] sm:w-auto"
                  >
                    Shop Covers
                  </a>
                </div>
              </div>

              <div className="mt-8 grid gap-2.5 text-sm sm:grid-cols-3 sm:gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3.5 max-[360px]:p-3">
                  <p className="text-2xl font-extrabold">3000+</p>
                  <p className="text-slate-200">Covers Delivered</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3.5 max-[360px]:p-3">
                  <p className="text-2xl font-extrabold">48h</p>
                  <p className="text-slate-200">Fast Dispatch</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3.5 max-[360px]:p-3">
                  <p className="text-2xl font-extrabold">5yr</p>
                  <p className="text-slate-200">UV Fade Warranty</p>
                </div>
              </div>
            </article>

            <article
              data-reveal
              style={revealStyle(110)}
              className="reveal flex min-h-[360px] flex-col rounded-3xl border border-white/10 bg-white/[0.08] p-4 text-white shadow-2xl backdrop-blur-md max-[360px]:rounded-2xl max-[360px]:p-3 sm:min-h-[420px] sm:p-5"
            >
              <img
                src={HERO_IMAGE}
                alt="Outdoor patio setup with protective covers"
                className="h-48 w-full rounded-2xl object-cover min-[380px]:h-52 sm:h-72 lg:h-[290px]"
                loading="lazy"
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.dataset.fallbackApplied === "true") return;
                  target.dataset.fallbackApplied = "true";
                  target.src = IMAGE_FALLBACK;
                }}
              />
              <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 max-[360px]:p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                    Best Seller
                  </p>
                  <p className="mt-2 text-base font-bold">Gas Braai Series X Cover</p>
                  <p className="mt-1 text-sm text-slate-200">Heat-safe lining and storm straps.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 max-[360px]:p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                    New Fabric
                  </p>
                  <p className="mt-2 text-base font-bold">ProWeave 650D</p>
                  <p className="mt-1 text-sm text-slate-200">Higher tear resistance for patios.</p>
                </div>
                <div className="sm:col-span-2 rounded-xl border border-emerald-200/25 bg-emerald-500/10 p-4 text-sm text-emerald-50 max-[360px]:p-3">
                  Tailored sizing support available in-store for odd-shaped patio suites and corner
                  braai units.
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="catalog"
        className="mx-auto mt-8 grid w-full max-w-[1500px] items-start gap-4 px-1.5 min-[380px]:px-2 sm:px-6 min-[860px]:grid-cols-[290px,1fr] min-[860px]:items-start min-[860px]:gap-5 lg:px-14"
      >
        <div className="min-[860px]:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-3 py-2.5 text-left text-[13px] font-bold text-emerald-800 shadow-sm transition hover:border-emerald-300 max-[360px]:px-2.5 max-[360px]:py-2"
            aria-expanded={mobileFiltersOpen}
            aria-controls="catalog-filters-panel"
          >
            <span>Advanced Filters</span>
            <FilterMenuIcon open={mobileFiltersOpen} />
          </button>
        </div>

        <aside
          id="catalog-filters-panel"
          data-reveal
          className={
            "reveal overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-2.5 shadow-lg backdrop-blur-md min-[380px]:p-3 sm:rounded-3xl sm:p-5 min-[860px]:sticky min-[860px]:top-20 min-[860px]:self-start " +
            (mobileFiltersOpen ? "block" : "hidden min-[860px]:block")
          }
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">Advanced Filters</h2>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 transition hover:text-emerald-900"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 min-[860px]:hidden"
                aria-label="Close advanced filters"
              >
                <ChevronIcon direction="left" />
              </button>
            </div>
          </div>

          <div className="covergard-scrollbar max-h-[72vh] space-y-4 overflow-y-auto pr-0.5 text-sm sm:space-y-5 sm:pr-1 min-[860px]:max-h-[calc(100dvh-13rem)] min-[860px]:overflow-y-auto">
            <div>
              <label htmlFor="search-filter" className="mb-1 block font-semibold text-slate-700">
                Search
              </label>
              <input
                id="search-filter"
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="patio, braai, bench..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-700">Category</p>
              <div className="space-y-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <label key={category} className="flex items-start gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        setSelectedCategories((current) => toggleSelection(current, category))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-300"
                    />
                    <span className="break-words leading-5">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-700">Material</p>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_OPTIONS.map((material) => {
                  const active = selectedMaterials.includes(material);
                  return (
                    <button
                      key={material}
                      type="button"
                      onClick={() =>
                        setSelectedMaterials((current) => toggleSelection(current, material))
                      }
                      className={
                        active
                          ? "max-w-full whitespace-normal break-words rounded-full border border-emerald-500 bg-emerald-50 px-3 py-1 text-left text-xs font-bold leading-4 text-emerald-700 max-[360px]:px-2 max-[360px]:text-[11px]"
                          : "max-w-full whitespace-normal break-words rounded-full border border-slate-200 bg-white px-3 py-1 text-left text-xs font-semibold leading-4 text-slate-600 hover:border-emerald-300 max-[360px]:px-2 max-[360px]:text-[11px]"
                      }
                    >
                      {material}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-700">Fit Type</p>
              <div className="flex flex-wrap gap-2">
                {FIT_OPTIONS.map((fit) => {
                  const active = selectedFits.includes(fit);
                  return (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setSelectedFits((current) => toggleSelection(current, fit))}
                      className={
                        active
                          ? "max-w-full whitespace-normal break-words rounded-full border border-slate-800 bg-slate-800 px-3 py-1 text-left text-xs font-bold leading-4 text-white max-[360px]:px-2 max-[360px]:text-[11px]"
                          : "max-w-full whitespace-normal break-words rounded-full border border-slate-200 bg-white px-3 py-1 text-left text-xs font-semibold leading-4 text-slate-600 hover:border-slate-400 max-[360px]:px-2 max-[360px]:text-[11px]"
                      }
                    >
                      {fit}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-700">Weather Rating</p>
              <div className="space-y-2">
                {WEATHER_OPTIONS.map((weather) => (
                  <label key={weather} className="flex items-start gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      checked={selectedWeather.includes(weather)}
                      onChange={() =>
                        setSelectedWeather((current) => toggleSelection(current, weather))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-300"
                    />
                    <span className="break-words leading-5">{weather}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-700">Price Range</p>
              <p className="mb-2 text-xs text-slate-500">
                ${minPrice} - ${maxPrice}
              </p>
              <input
                type="range"
                min={PRICE_LIMITS.min}
                max={PRICE_LIMITS.max}
                value={minPrice}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setMinPrice(Math.min(value, maxPrice));
                }}
                className="covergard-range mb-2 w-full"
              />
              <input
                type="range"
                min={PRICE_LIMITS.min}
                max={PRICE_LIMITS.max}
                value={maxPrice}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setMaxPrice(Math.max(value, minPrice));
                }}
                className="covergard-range w-full"
              />
            </div>

            <div>
              <label htmlFor="rating-filter" className="mb-1 block font-semibold text-slate-700">
                Minimum Rating
              </label>
              <div className="relative">
                <select
                  id="rating-filter"
                  value={minimumRating}
                  onChange={(event) => setMinimumRating(Number(event.target.value))}
                  className={FILTER_SELECT_CLASS}
                >
                  <option value={0}>All Ratings</option>
                  <option value={3.5}>3.5 and above</option>
                  <option value={4}>4.0 and above</option>
                  <option value={4.5}>4.5 and above</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700/75">
                  <SelectCaretIcon />
                </span>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2 text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly((value) => !value)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-300"
                />
                <span className="font-semibold leading-5">In-stock only</span>
              </label>
            </div>

            <div>
              <label htmlFor="sort-filter" className="mb-1 block font-semibold text-slate-700">
                Sort by
              </label>
              <div className="relative">
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortBy)}
                  className={FILTER_SELECT_CLASS}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                  <option value="rating-desc">Highest rated</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700/75">
                  <SelectCaretIcon />
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {SECTION_META.map((section, index) => (
            <div
              key={section.id}
              data-reveal
              style={revealStyle(120 * (index + 1))}
              className="reveal"
            >
              <ProductCarousel
                title={section.title}
                description={section.description}
                products={matchingProducts.filter((product) => product.section === section.id)}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="specials"
        data-reveal
        style={revealStyle(160)}
        className="reveal mx-auto mt-8 w-full max-w-[1500px] px-1.5 min-[380px]:px-2 sm:px-6 lg:px-14"
      >
        <div className="overflow-hidden rounded-2xl border border-emerald-100/70 bg-white/85 p-4 shadow-lg backdrop-blur-sm max-[360px]:p-3.5 sm:rounded-[2rem] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 max-[360px]:text-[17px] sm:text-2xl">Specials: Custom Cover</h2>
              <p className="text-sm text-slate-600 max-[360px]:text-[13px]">
                Enter your measurements and preferences for a custom special cover request.
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 max-[360px]:text-[11px]">
              Custom Specials
            </span>
          </div>

          <form onSubmit={handleSpecialSubmit} className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label htmlFor="special-length" className="mb-1 block text-sm font-semibold text-slate-700">
                Length (cm)
              </label>
              <input
                id="special-length"
                type="number"
                min={0}
                step="0.1"
                value={specialRequest.length}
                onChange={(event) => updateSpecialField("length", event.target.value)}
                placeholder="e.g. 210"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 max-[360px]:px-2.5 max-[360px]:py-1.5 max-[360px]:text-[13px]"
                required
              />
            </div>

            <div>
              <label htmlFor="special-height" className="mb-1 block text-sm font-semibold text-slate-700">
                Height (cm)
              </label>
              <input
                id="special-height"
                type="number"
                min={0}
                step="0.1"
                value={specialRequest.height}
                onChange={(event) => updateSpecialField("height", event.target.value)}
                placeholder="e.g. 95"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 max-[360px]:px-2.5 max-[360px]:py-1.5 max-[360px]:text-[13px]"
                required
              />
            </div>

            <div>
              <label htmlFor="special-width" className="mb-1 block text-sm font-semibold text-slate-700">
                Width (cm)
              </label>
              <input
                id="special-width"
                type="number"
                min={0}
                step="0.1"
                value={specialRequest.width}
                onChange={(event) => updateSpecialField("width", event.target.value)}
                placeholder="e.g. 140"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 max-[360px]:px-2.5 max-[360px]:py-1.5 max-[360px]:text-[13px]"
                required
              />
            </div>

            <div>
              <label htmlFor="special-fabric" className="mb-1 block text-sm font-semibold text-slate-700">
                Fabric
              </label>
              <div className="relative">
                <select
                  id="special-fabric"
                  value={specialRequest.fabric}
                  onChange={(event) => updateSpecialField("fabric", event.target.value)}
                  className={SPECIAL_SELECT_CLASS}
                >
                  {SPECIAL_FABRIC_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700/75">
                  <SelectCaretIcon />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="special-color" className="mb-1 block text-sm font-semibold text-slate-700">
                Color
              </label>
              <div className="relative">
                <select
                  id="special-color"
                  value={specialRequest.color}
                  onChange={(event) => updateSpecialField("color", event.target.value)}
                  className={SPECIAL_SELECT_CLASS}
                >
                  {SPECIAL_COLOR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700/75">
                  <SelectCaretIcon />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="special-cover-option" className="mb-1 block text-sm font-semibold text-slate-700">
                Cover Option
              </label>
              <div className="relative">
                <select
                  id="special-cover-option"
                  value={specialRequest.coverOption}
                  onChange={(event) => updateSpecialField("coverOption", event.target.value)}
                  className={SPECIAL_SELECT_CLASS}
                >
                  {SPECIAL_COVER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700/75">
                  <SelectCaretIcon />
                </span>
              </div>
            </div>

            <div className="xl:col-span-3 flex flex-wrap items-start gap-3 pt-1">
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 max-[360px]:px-4 max-[360px]:text-[13px] sm:w-auto"
              >
                Submit Specials Request
              </button>
              <p className="text-xs leading-5 text-slate-500">
                These details can be used to prepare a quote and production plan. 
              </p>
            </div>
          </form>

          {specialSubmitted ? (
            <p className="mt-4 break-words rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 max-[360px]:px-3 max-[360px]:text-[13px]">
              Special request captured for {specialRequest.coverOption}: {specialRequest.length} x{" "}
              {specialRequest.width} x {specialRequest.height} cm. <br />
              A representative will be in contact you with a quote. 
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
