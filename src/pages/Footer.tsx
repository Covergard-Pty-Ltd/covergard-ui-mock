export default function Footer() {
  return (
    <footer
      id="store-footer"
      className="mx-auto mt-6 w-full max-w-[1500px] overflow-hidden rounded-2xl border border-emerald-900/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-2.5 py-7 text-slate-100 shadow-2xl min-[380px]:px-3 sm:mt-8 sm:rounded-[2rem] sm:px-6 lg:px-14"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-3">
          <h3 className="text-lg font-extrabold sm:text-2xl">Covergard (Pty) Ltd</h3>
          <p className="max-w-xl text-sm text-slate-300">
            Need exact sizing for your patio suite or braai? Visit us for in-person guidance,
            fast measuring support, and same-week dispatch options.
          </p>
          <div className="grid gap-2 break-words text-sm text-slate-200">
            <p>
              <span className="font-semibold text-white">Address:</span> 55 5th Street, Wynberg, Sandton
            </p>
            <p>
              <span className="font-semibold text-white">Phone:</span> +27 21 555 0142
            </p>
            <p>
              <span className="font-semibold text-white">Operational Hours:</span> Mon-Fri, 8:00 AM - 5:00 PM
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="CoverGard Store Map"
            src="https://www.google.com/maps?q=55+5th+street+wynberg+sandton&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-48 w-full min-[380px]:h-52 sm:h-64"
          />
        </div>
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-slate-400 sm:text-xs">
        (c) {new Date().getFullYear()} Covergard. Protecting your lifestyle. All rights reserved.
      </p>
    </footer>
  );
}
