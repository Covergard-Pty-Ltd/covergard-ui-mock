import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto bg-white">
      <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center px-3 py-6 min-[380px]:px-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-8 lg:px-8">
        <div className="pointer-events-none absolute -top-8 right-0 h-40 w-40 rounded-full bg-green-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-0 h-44 w-44 rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative w-full max-w-xl">
          <div
            className={`w-full rounded-2xl border border-green-100 bg-white p-4 shadow-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[380px]:p-5 sm:p-8 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-600/70 min-[380px]:text-xs min-[380px]:tracking-[0.3em]">
                Covergard
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Set up your account in seconds.
              </p>
            </div>

            <form
              className="mt-4 grid gap-3 sm:gap-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-1.5">
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

              <div className="grid gap-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
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

              <div className="grid gap-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className="w-full rounded-lg border border-green-100 bg-white px-3 py-2 pr-16 text-sm text-gray-800 shadow-sm focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 min-[380px]:pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-green-200 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-100 min-[380px]:px-3 min-[380px]:text-[11px]"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm leading-5 text-gray-600">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-green-200 text-green-600 focus:ring-green-200"
                />
                I agree to the{" "}
                <Link to="/terms" className="text-green-600 underline hover:text-green-500">
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-green-600 underline hover:text-green-500">
                  privacy policy.
                </Link>
              </label>

              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Create account
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-green-600 transition hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
