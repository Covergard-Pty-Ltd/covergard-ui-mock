import { useEffect } from "react";
import type { CSSProperties } from "react";

const HERO_IMAGE = "https://picsum.photos/seed/covergard-about/1400/1000";
const IMAGE_FALLBACK = "https://placehold.co/1200x900/e2e8f0/0f172a?text=CoverGard+Example";

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

export default function About() {
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

  return (
    <main className="w-full overflow-x-hidden pb-14">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-10 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.38),transparent_36%),radial-gradient(circle_at_86%_13%,rgba(250,204,21,0.22),transparent_30%),radial-gradient(circle_at_55%_100%,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-14 flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
          <div
            data-reveal
            className="reveal flex-1 text-white"
          >
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              About Covergard
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-200 sm:text-xl">
              At Covergard, we provide durable, weather-resistant covers for every outdoor setup.
              From patios and lounges to gas braais and benches, our products are tailored to protect and last.
            </p>
            <p className="mt-4 max-w-xl text-lg text-slate-200 sm:text-xl">
              Our mission is simple: deliver high-quality protective covers that combine functionality with sleek design.
            </p>
          </div>
          <div
            data-reveal
            style={revealStyle(100)}
            className="reveal flex-1 overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={HERO_IMAGE}
              alt="CoverGard team and products"
              className="w-full rounded-3xl object-cover sm:h-80 lg:h-[360px]"
              loading="lazy"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.dataset.fallbackApplied === "true") return;
                target.dataset.fallbackApplied = "true";
                target.src = IMAGE_FALLBACK;
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-reveal
        style={revealStyle(150)}
        className="reveal mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:gap-8"
      >
        <div className="rounded-xl border border-white/20 bg-black/10 p-6 text-center">
          <p className="text-3xl font-extrabold text-slate-900">3000+</p>
          <p className="mt-1 text-slate-600">Covers Delivered</p>
        </div>
        <div className="rounded-xl border border-white/20 bg-black/10 p-6 text-center">
          <p className="text-3xl font-extrabold text-slate-900">48h</p>
          <p className="mt-1 text-slate-600">Fast Dispatch</p>
        </div>
        <div className="rounded-xl border border-white/20 bg-black/10 p-6 text-center">
          <p className="text-3xl font-extrabold text-slate-900">5yr</p>
          <p className="mt-1 text-slate-600">UV Fade Warranty</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div
            data-reveal
            style={revealStyle(200)}
            className="reveal"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Our Story
            </h2>
            <p className="mt-4 text-slate-700">
              Covergard started with a simple idea: outdoor furniture and equipment deserved protection that didn't compromise on style. 
              Over the years, we have refined our materials, stitching, and coatings to withstand South Africa’s diverse weather conditions.
            </p>
            <p className="mt-2 text-slate-700">
              Today, thousands of homes trust CoverGard for durability, fit, and elegance.  
            </p>
          </div>
          <div
            data-reveal
            style={revealStyle(250)}
            className="reveal overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src="https://picsum.photos/seed/covergard-story/800/600"
              alt="CoverGard story image"
              className="w-full rounded-3xl object-cover sm:h-72 lg:h-[300px]"
              loading="lazy"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.dataset.fallbackApplied === "true") return;
                target.dataset.fallbackApplied = "true";
                target.src = IMAGE_FALLBACK;
              }}
            />
          </div>
        </div>
      </section>

     {/* How It Works / Our Process Section */}
<section className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6 lg:px-14">
  <h2
    data-reveal
    style={revealStyle(300)}
    className="reveal text-2xl font-extrabold text-slate-900 sm:text-3xl"
  >
    How It Works
  </h2>
  <p
    data-reveal
    style={revealStyle(320)}
    className="reveal mt-3 max-w-2xl text-slate-600 sm:text-lg"
  >
    From design to delivery, every Covergard product is crafted to protect your outdoor spaces.
    Our covers undergo rigorous testing for weather resistance, UV protection, and durability.
  </p>

  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Custom Fit",
        description:
          "Choose the perfect size for your patio furniture, braai, or lounge set, ensuring a snug and secure fit.",
        icon: "🎯",
      },
      {
        title: "Weather-Tested Materials",
        description:
          "Our fabrics resist UV, rain, and extreme temperatures to protect your investment year-round.",
        icon: "☀️",
      },
      {
        title: "Easy Care & Durable",
        description:
          "Covers are easy to clean, fold, and store, built to last multiple seasons without fading or tearing.",
        icon: "🛠️",
      },
    ].map((step, idx) => (
      <div
        key={step.title}
        data-reveal
        style={revealStyle(350 + idx * 50)}
        className="reveal rounded-2xl border border-white/20 bg-white/5 p-6 text-center shadow-md transition hover:shadow-lg"
      >
        <div className="text-4xl">{step.icon}</div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{step.description}</p>
      </div>
    ))}
  </div>
</section>


      {/* CTA Section */}
      <section className="mx-auto mt-16 max-w-[1200px] px-4 text-center sm:px-6 lg:px-14">
        <h2
          data-reveal
          style={revealStyle(400)}
          className="reveal text-2xl font-extrabold text-slate-900 sm:text-3xl"
        >
          Protect Your Outdoor Spaces Today
        </h2>
        <p
          data-reveal
          style={revealStyle(450)}
          className="reveal mt-3 text-slate-700 sm:text-lg"
        >
          Explore our full range of custom-fit covers for patios, braais, benches, and more.
        </p>
        <a
          href="/"
          data-reveal
          style={revealStyle(500)}
          className="reveal mt-6 inline-block rounded-full bg-emerald-400 px-6 py-3 font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
        >
          Shop our Catalog Today
        </a>
      </section>
    </main>
  );
}
