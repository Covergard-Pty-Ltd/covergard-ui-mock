import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LazyLoader from "./components/Loading/LazyLoader";
import Footer from "./pages/Footer";
import NotFound from "./components/404/NotFound";

const Navbar = lazy(() => import("./components/Nav/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyAndTerms = lazy(() => import("./pages/terms-and-policy"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const HIDE_FOOTER_PATHS = new Set(["/login", "/register"]);

function App() {
  return (
    <Router>
      <Suspense fallback={<LazyLoader message="Loading content..." />}>
        <AppLayout />
      </Suspense>
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const hideFooter = HIDE_FOOTER_PATHS.has(location.pathname);

  return (
    <>
      <Navbar />
      <div className="w-full pt-14 sm:pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<PrivacyAndTerms type="terms" />} />
          <Route path="/privacy" element={<PrivacyAndTerms type="privacy" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        {!hideFooter ? <Footer /> : null}
      </div>
    </>
  );
}

export default App;
