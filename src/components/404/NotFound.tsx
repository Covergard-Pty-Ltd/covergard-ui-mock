import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl text-center space-y-4 animate-slide-fade">
        
        {/* Decorative Image (larger size, transparent background) */}
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-full h-96 object-contain mb-1"
        />

        <h1 className="text-6xl font-extrabold text-slate-900">Error 404</h1>
        <h2 className="text-3xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-slate-600 leading-relaxed">
          The page you are looking for does not exist. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
