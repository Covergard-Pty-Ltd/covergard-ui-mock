import { useEffect, type CSSProperties } from "react";

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

export default function ContactFormPage() {
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
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    observed.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full overflow-x-hidden pb-16 bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-emerald-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.1),transparent_30%)]" />
        <div className="relative mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-14 text-center">
          <h1
            data-reveal
            style={revealStyle(200)}
            className="reveal text-3xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </h1>
          <p
            data-reveal
            style={revealStyle(250)}
            className="reveal mt-4 text-lg text-slate-700 sm:text-xl"
          >
            Fill out the form below to send us your query. We’ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto mt-12 max-w-[800px] px-4 sm:px-6 lg:px-14">
        <div
          data-reveal
          style={revealStyle(300)}
          className="reveal rounded-3xl bg-white backdrop-blur-md border border-white/20 shadow-lg p-8 sm:p-12"
        >
          <form className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-800 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Subject of your query"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg transition"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-400 px-6 py-3 text-white font-semibold text-lg hover:bg-emerald-500 transition shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
