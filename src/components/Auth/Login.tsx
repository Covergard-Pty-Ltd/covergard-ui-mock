import { useEffect, useState } from "react";

export default function Login() {
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Play entry animation after first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto bg-white">
      <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center px-3 py-6 min-[380px]:px-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-8 lg:px-8">
        {/* Subtle background glow accents */}
        <div className="pointer-events-none absolute -top-10 right-0 h-48 w-48 rounded-full bg-green-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-0 h-56 w-56 rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative w-full max-w-lg">
          <div
            className={`w-full rounded-2xl border border-green-100 bg-white p-4 shadow-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[380px]:p-5 sm:p-10 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {/* Header */}
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-600/70 min-[380px]:text-xs min-[380px]:tracking-[0.3em]">
                Covergard
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900 min-[380px]:text-3xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Continue with a trusted provider.
              </p>
            </div>

            {/* SSO options */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50"
              >
                <AppleIcon />
                Apple
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 sm:col-span-2"
              >
                <MicrosoftIcon />
                Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-2 text-[11px] text-gray-400 sm:gap-3 sm:text-xs">
              <span className="h-px flex-1 bg-green-100" />
              <span className="shrink-0 text-center">or email and password</span>
              <span className="h-px flex-1 bg-green-100" />
            </div>

            {/* Email and password form */}
            <form className="grid gap-3 sm:gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@covergard.com"
                  className="w-full rounded-lg border border-green-100 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                  Password
                </label>
                {/* Password field with toggle */}
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-green-100 bg-white px-3 py-2 pr-16 text-sm text-gray-800 shadow-sm focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 min-[380px]:pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-green-200 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-100 min-[380px]:px-3 min-[380px]:text-[11px]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember + reset */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-green-200 text-green-600 focus:ring-green-200"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary action */}
              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Sign in
              </button>
            </form>

            {/* Footer link */}
            <p className="mt-5 text-center text-sm text-gray-500">
              Don&#39;t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-green-600 transition hover:text-green-500"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Provider icons
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.7 2.3-2.6 3.9-5.5 3.9a6 6 0 0 1 0-12c1.6 0 3 .6 4.1 1.6l2.7-2.7A9.6 9.6 0 0 0 12 2.4 9.6 9.6 0 1 0 12 21.6c4.9 0 9-3.5 9-9 0-.6-.1-1.2-.2-1.8H12z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="text-slate-900"
    >
      <path d="M16.7 2.7c-1 .1-2.2.7-2.9 1.6-.6.7-1.1 1.8-.9 2.9 1.1.1 2.3-.6 3-1.5.6-.7 1.1-1.8.8-3zM12 7.2c-1.7 0-3.1 1-3.9 1-1 0-2.1-.9-3.5-.9-1.8 0-3.4 1-4.3 2.6-1.8 3.1-.4 7.7 1.3 10.2.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.3 1.2-2.6 1.2-2.7-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.3 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.1-2.7.9-3.5.9z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M2 2h9v9H2z" />
      <path fill="#7FBA00" d="M13 2h9v9h-9z" />
      <path fill="#00A4EF" d="M2 13h9v9H2z" />
      <path fill="#FFB900" d="M13 13h9v9h-9z" />
    </svg>
  );
}
