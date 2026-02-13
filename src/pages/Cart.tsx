import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, IMAGE_FALLBACK } from "../data/products";

type CartItem = {
  productId: number;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 1, quantity: 2 },
    { productId: 4, quantity: 1 },
    { productId: 7, quantity: 3 },
  ]);

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 100 ? 0 : 15; // Example: free delivery over $100
  const vatRate = 0.15; // 15% VAT
  const vatAmount = subtotal * vatRate;
  const totalPrice = subtotal + deliveryFee + vatAmount;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Your cart is empty
          </h1>
          <Link
            to="/"
            className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-500 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen pb-20 pt-10 animate-[fadeIn_0.5s_ease-out]">
      <section className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Your Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-700 hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.dataset.fallbackApplied === "true") return;
                        target.dataset.fallbackApplied = "true";
                        target.src = IMAGE_FALLBACK;
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-between p-5 flex-1">
                    <div>
                      <h2 className="font-semibold text-slate-900 text-lg">
                        {product.name}
                      </h2>
                      <p className="text-slate-500 mt-1">{product.category}</p>
                      <p className="text-slate-700 font-bold mt-2">
                        ${product.price} each
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-full overflow-hidden w-max">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-3 py-1 text-slate-600 font-semibold hover:bg-slate-100 transition"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-slate-900 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-3 py-1 text-slate-600 font-semibold hover:bg-slate-100 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full">
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between text-slate-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Delivery Info */}
              {/* Delivery & Notes */}
              <div className="bg-slate-50 p-6 rounded-xl space-y-3 text-sm text-slate-700">
                <h3 className="font-semibold text-slate-900 text-lg">
                  Delivery & Notes
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Free standard delivery on orders over $100; $15 otherwise.
                  </li>
                  <li>Shipping: 2–5 business days with tracking.</li>
                  <li>Returns within 30 days (unused, original packaging).</li>
                  <li>Special instructions can be added at checkout.</li>
                </ul>
              </div>

              {/* Delivery & VAT Calculation */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm text-slate-700">
                <h3 className="font-semibold text-slate-900">Delivery & VAT</h3>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (15%)</span>
                  <span>${vatAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to=""
                className="bg-emerald-600 text-white text-center py-3 rounded-full font-semibold shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/"
                className="text-slate-600 text-center font-semibold hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
