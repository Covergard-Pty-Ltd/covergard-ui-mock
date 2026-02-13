import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IMAGE_FALLBACK, PRODUCTS } from "../data/products";

function ProductInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm border-b border-slate-200/60 last:border-none">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="text-slate-900 font-semibold">{value}</span>
    </div>
  );
}

export default function ProductPage() {
  const { productId } = useParams();
  const parsedId = Number(productId);
  const product = PRODUCTS.find((item) => item.id === parsedId);

  const navigate = useNavigate();

  // State to track which image is displayed as main
  const [mainImage, setMainImage] = useState<string | undefined>(
    product?.images[0],
  );

  const relatedProducts = useMemo(() => {
    if (!product) return PRODUCTS.slice(0, 4);

    return PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          item.section === product.section),
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Product not found
          </h1>
          <Link
            to="/"
            className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-500 transition"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const stockLabel = product.inStock ? "In Stock" : "Pre-Order";
  const stockColor = product.inStock
    ? "bg-emerald-100 text-emerald-700"
    : "bg-slate-200 text-slate-700";

  return (
    <main className="bg-slate-50 min-h-screen pb-20 pt-10 animate-[fadeIn_0.5s_ease-out]">
      <section className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2
                bg-white px-4 py-2 rounded-full shadow-md
                text-slate-700 font-semibold
                transition-all duration-300 transform
                hover:scale-105 hover:shadow-lg hover:bg-emerald-50 hover:text-emerald-700
                animate-[fadeIn_0.5s_ease-out]">
            ← Back
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* IMAGE SIDE */}
          <div className="relative group">
            <div className="overflow-hidden rounded-3xl shadow-xl bg-white">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105"
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.dataset.fallbackApplied === "true") return;
                  target.dataset.fallbackApplied = "true";
                  target.src = IMAGE_FALLBACK;
                }}
              />
            </div>

            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-slate-800 shadow">
                {product.category}
              </span>
            </div>

            {/* SUB-PHOTOS */}
            <div className="mt-4 flex gap-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                    mainImage === img
                      ? "border-emerald-600"
                      : "border-transparent hover:border-slate-300"
                  }`}
                  onClick={() => setMainImage(img)}
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.dataset.fallbackApplied === "true") return;
                    target.dataset.fallbackApplied = "true";
                    target.src = IMAGE_FALLBACK;
                  }}
                />
              ))}
            </div>
          </div>

          {/* DETAILS SIDE */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                {product.section}
              </p>
              <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mt-2">
                {product.name}
              </h1>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-xl">
                Premium outdoor protection engineered with reinforced seams,
                high-grade materials and all-weather durability for year-round
                performance.
              </p>
            </div>

            {/* PRICE + STOCK */}
            <div className="flex items-center gap-6">
              <span className="text-4xl font-black text-slate-900">
                ${product.price}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${stockColor}`}
              >
                {stockLabel}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                Buy Now
              </Link>
              <Link
                to="/#specials"
                className="border border-slate-300 px-8 py-3 rounded-full font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
              >
                Custom Quote
              </Link>
              <Link
                to="/cart"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                Add to Cart
              </Link>
            </div>

            {/* SPECS */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Specifications
              </h2>
              <ProductInfoRow label="Material" value={product.material} />
              <ProductInfoRow label="Fit Type" value={product.fit} />
              <ProductInfoRow label="Weather Grade" value={product.weather} />
              <ProductInfoRow
                label="Customer Rating"
                value={`${product.rating.toFixed(1)} / 5`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            You May Also Like
          </h2>
          <Link
            to="/#catalog"
            className="text-emerald-600 font-semibold hover:underline"
          >
            View Catalog
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition">
                  {item.name}
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-900">
                    ${item.price}
                  </span>
                  <span className="text-amber-500 font-medium">
                    {item.rating.toFixed(1)} ★
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
