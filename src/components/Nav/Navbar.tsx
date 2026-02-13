import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavLink = {
  to: string;
  label: string;
};

// Single source of truth for nav link labels/routes.
const NAV_LINKS: NavLink[] = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

// Shared class names keep styling consistent across renders.
const DESKTOP_LINK_CLASS =
  "text-gray-800 font-medium hover:text-emerald-400 transition";
const MOBILE_LINK_CLASS =
  "block break-words whitespace-normal px-3 py-2 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-500";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement | null>(null);

  // Close login dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!loginRef.current) return;
      if (!loginRef.current.contains(event.target as Node)) {
        setLoginOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ensure only one dropdown is open at a time.
  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      if (next) setLoginOpen(false);
      return next;
    });
  };

  const toggleLogin = () => {
    setLoginOpen((open) => {
      const next = !open;
      if (next) setMenuOpen(false);
      return next;
    });
  };

  const closeMenu = () => setMenuOpen(false);
  const closeLogin = () => setLoginOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white py-2 shadow-sm sm:py-3">
      {/* Three-column layout: brand, desktop links, action area */}
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[auto,1fr,auto] items-center gap-2 px-2 sm:gap-3 sm:px-6 lg:px-8">
        <BrandLink />
        <DesktopNavLinks links={NAV_LINKS} />

        {/* Right: Search, Account, Cart, Hamburger */}
        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2.5">
          {/* Account dropdown */}
          <div ref={loginRef} className="relative">
            <button
              type="button"
              className="rounded-full p-1 text-gray-700 transition hover:bg-emerald-100 hover:text-gray-700 min-[380px]:p-1.5 sm:p-2"
              title="Account"
              aria-haspopup="menu"
              aria-expanded={loginOpen}
              aria-controls="login-menu"
              onClick={toggleLogin}
            >
              <UserIcon />
            </button>
            {loginOpen && (
              <div
                id="login-menu"
                role="menu"
                className="absolute right-0 mt-2 w-36 max-w-[calc(100vw-1rem)] rounded-md border border-gray-100 bg-white py-1 shadow-md sm:w-40 z-[1000]"
              >
                <Link
                  to="/login"
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-500 transition"
                  onClick={closeLogin}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-500 transition"
                  onClick={closeLogin}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <IconLink to="/cart" title="Cart">
            <CartIcon />
          </IconLink>

          {/* Mobile nav dropdown (right-aligned) */}
          <div className="relative lg:hidden">
            <HamburgerButton open={menuOpen} onClick={toggleMenu} />
            <MobileMenu open={menuOpen} links={NAV_LINKS} onClose={closeMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function BrandLink() {
  return (
    <Link
      to="/"
      className="text-[0.83rem] font-extrabold tracking-[0.01em] text-gray-900 transition hover:text-emerald-400 min-[380px]:text-base min-[380px]:tracking-normal sm:text-lg sm:tracking-wide"
    >
      COVERGARD
    </Link>
  );
}

// Desktop-only center navigation.
function DesktopNavLinks({ links }: { links: NavLink[] }) {
  return (
    <div className="hidden lg:flex justify-center min-w-0">
      <div className="flex items-center gap-8 whitespace-nowrap">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={DESKTOP_LINK_CLASS}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Generic circular icon button link.
function IconLink({
  to,
  title,
  children,
}: {
  to: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="rounded-full p-1 text-gray-700 transition hover:bg-emerald-100 hover:text-gray-700 min-[380px]:p-1.5 sm:p-2"
      title={title}
    >
      {children}
    </Link>
  );
}

// Hamburger toggles mobile nav dropdown.
function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative flex h-7 w-7 items-center justify-center rounded-full border-none bg-transparent text-gray-700 transition hover:bg-emerald-100 hover:text-gray-700 focus:outline-none focus:ring-0 active:border-none min-[380px]:h-8 min-[380px]:w-8 lg:hidden"
      onClick={onClick}
      aria-label="Toggle navigation menu"
      aria-expanded={open}
      aria-controls="mobile-menu"
    >
      <span className="block absolute top-1/2 left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2">
        <span
          className={
            `block absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out bg-gray-700 group-hover:bg-emerald-400 ` +
            (open ? "rotate-45 top-2" : "top-0")
          }
        />
        <span
          className={
            `block absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out bg-gray-700 group-hover:bg-emerald-400 ` +
            (open ? "opacity-0 left-2" : "top-2")
          }
        />
        <span
          className={
            `block absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out bg-gray-700 group-hover:bg-emerald-400 ` +
            (open ? "-rotate-45 top-2" : "top-4")
          }
        />
      </span>
    </button>
  );
}

// Mobile dropdown menu anchored to the hamburger.
function MobileMenu({
  open,
  links,
  onClose,
}: {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="absolute right-0 mt-2 w-40 max-w-[calc(100vw-1rem)] rounded-md border border-gray-100 bg-white py-1 shadow-md animate-fadein z-[1000]"
    >
      <div className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={MOBILE_LINK_CLASS}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
