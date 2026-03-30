import React from 'react';
import {
  MapPin,
  Truck,
  User,
  Search,
  ShoppingCart,
  Heart,
  Info,
  House,
  Menu,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import BrandIdentity from './BrandIdentity';
import { categoryDefinitions } from '../data/catalog';
import { brandName } from '../data/branding';

const searchPhrases = [
  'Search for Headphones...',
  'Search for Smartphones...',
  'Search for Laptops...',
  'Search for Gadgets...',
];

const TypingPlaceholder = () => {
  const [text, setText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [loopNum, setLoopNum] = React.useState(0);
  const [typingSpeed, setTypingSpeed] = React.useState(150);

  React.useEffect(() => {
    const handleType = () => {
      const index = loopNum % searchPhrases.length;
      const fullText = searchPhrases[index];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span>
      {text}
      <span className="ml-1 h-4 animate-pulse border-r-2 border-[var(--color-accent-orange)]" />
    </span>
  );
};

const categoryNavItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/shop' },
  ...categoryDefinitions.map((category) => ({
    label: category.name,
    to: `/category/${category.slug}`,
  })),
];

const toggleRoutes = ['/about', '/wishlist', '/cart'];
const hiddenCategoryRoutes = ['/about', '/wishlist', '/cart', '/login-services-down'];

const HeaderGizmos = ({ cartCount = 0, wishlistCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = React.useState(
    () => new URLSearchParams(location.search).get('search') ?? '',
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    setSearchValue(new URLSearchParams(location.search).get('search') ?? '');
  }, [location.search]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop((current) => {
        if (current) {
          return window.scrollY < 36;
        }

        return window.scrollY <= 4;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;

    if (!toggleRoutes.includes(location.pathname)) {
      window.sessionStorage.setItem('header-return-path', currentPath);
    }
  }, [location.hash, location.pathname, location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    }

    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
    setIsMobileMenuOpen(false);
  };

  const handleToggleRoute = (target) => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const returnPath = window.sessionStorage.getItem('header-return-path') || '/';

    if (location.pathname === target) {
      navigate(returnPath);
      setIsMobileMenuOpen(false);
      return;
    }

    if (!toggleRoutes.includes(location.pathname)) {
      window.sessionStorage.setItem('header-return-path', currentPath);
    }

    navigate(target);
    setIsMobileMenuOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleGoToProducts = () => {
    navigate('/shop');
    setIsMobileMenuOpen(false);
  };

  const handleGoToAccount = () => {
    navigate('/login-services-down');
    setIsMobileMenuOpen(false);
  };

  const isToggleRouteActive = (target) => location.pathname === target;
  const isProductsRouteActive = location.pathname === '/shop';
  const shouldHideCategoryTabs = hiddenCategoryRoutes.includes(location.pathname);
  const isMobileCategoryVisible = isMobileMenuOpen;
  const isDesktopCategoryVisible = !shouldHideCategoryTabs && isAtTop;
  return (
    <header className="relative z-[70] w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[var(--color-accent-orange)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div
        className={`header-top-bar hidden origin-top overflow-hidden border-gizmos-border bg-white/80 text-[13px] text-gray-500 transition-[max-height,opacity,transform,padding] duration-500 ease-out md:block md:px-8 ${
          isAtTop ? 'md:max-h-16 md:border-b md:px-4 md:py-2 md:opacity-100 md:translate-y-0' : 'md:max-h-0 md:px-4 md:py-0 md:opacity-0 md:-translate-y-2'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-[var(--color-accent-orange)]" />
              <span className="transition-colors hover:text-[var(--color-accent-orange)]">
                Welcome to {brandName} Store
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#store-locator" className="flex items-center gap-1 transition-colors hover:text-[var(--color-accent-orange)]">
              <MapPin size={14} />
              <span>Store Locator</span>
            </a>
            <button
              type="button"
              className="flex items-center gap-1 transition-colors hover:text-[var(--color-accent-orange)] sm:border-l sm:border-gizmos-border sm:pl-6"
              onClick={handleGoToAccount}
            >
              <User size={14} />
              <span>My Account</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 z-[72] w-full px-1 transition-all duration-500 ease-out${
          isAtTop
            ? 'top-0 md:top-[41px]'
            : 'top-0'
        }`}
      >
        <div
          className={`header-main-shell flex w-full flex-col gap-5 rounded-none border border-gizmos-border bg-white/88 px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 ease-out lg:flex-row lg:items-center lg:justify-between lg:gap-6 rounded-b-[10px] ${
            isAtTop ? 'shadow-[0_8px_22px_rgba(15,23,42,0.05)]' : 'shadow-[0_16px_32px_rgba(15,23,42,0.10)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <BrandIdentity
              className="transition-transform hover:scale-[1.02]"
              logoClassName="h-11 w-11 sm:h-12 sm:w-12"
              textSizeClassName="text-[2rem] sm:text-[2.2rem]"
            />

            <div className="flex items-center gap-2 lg:hidden">
              {shouldHideCategoryTabs ? (
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gizmos-border text-gizmos-text transition-colors hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)]"
                  aria-label="Go to home"
                  onClick={handleGoHome}
                >
                  <House size={20} />
                </button>
              ) : null}
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gizmos-border text-gizmos-text"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          <form className="relative w-full lg:max-w-[420px]" role="search" onSubmit={handleSearchSubmit}>
            <div className="glass-chip flex items-center rounded-full p-1 shadow-sm transition-all hover:shadow-md focus-within:border-[var(--color-accent-orange)]">
              <div className="relative flex flex-1 items-center">
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="site-search"
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-transparent sm:px-5"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={isFocused ? 'Search products...' : ''}
                />
                {!isFocused && searchValue === '' && (
                  <div className="pointer-events-none absolute left-4 flex h-full items-center text-sm text-gray-300 sm:left-5">
                    <TypingPlaceholder />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="cta-button-orange flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all hover:scale-105 hover:shadow-lg"
                title="Search"
                aria-label="Search products"
              >
                <Search size={15} />
              </button>
            </div>
          </form>

          <div className="hidden items-center justify-between gap-4 sm:justify-end sm:gap-6 lg:flex">
            <div className="flex items-center gap-4 sm:gap-5">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] transition-all duration-300 ${
                  isProductsRouteActive
                    ? 'border-[var(--color-accent-orange)] bg-[var(--color-accent-orange)] text-white shadow-[0_10px_24px_rgba(249,115,22,0.22)]'
                    : 'border-gizmos-border text-gizmos-text hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)]'
                }`}
                aria-current={isProductsRouteActive ? 'page' : undefined}
                onClick={handleGoToProducts}
              >
                Products
              </button>
              {shouldHideCategoryTabs ? (
                <button
                  type="button"
                  className="icon-toggle-button"
                  aria-label="Go to home"
                  onClick={handleGoHome}
                >
                  <House size={22} />
                </button>
              ) : null}
              <button
                type="button"
                className={`icon-toggle-button ${isToggleRouteActive('/about') ? 'icon-toggle-button-active' : ''}`}
                aria-label="About us"
                aria-pressed={isToggleRouteActive('/about')}
                onClick={() => handleToggleRoute('/about')}
              >
                <Info size={22} />
              </button>
              <button
                type="button"
                className={`icon-toggle-button relative ${isToggleRouteActive('/wishlist') ? 'icon-toggle-button-active' : ''}`}
                aria-label="Wishlist"
                aria-pressed={isToggleRouteActive('/wishlist')}
                onClick={() => handleToggleRoute('/wishlist')}
              >
                <Heart size={22} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[var(--color-accent-orange)] px-1 text-[10px] text-white">
                  {wishlistCount}
                </span>
              </button>
              <button
                type="button"
                className="icon-toggle-button"
                aria-label="Account"
                onClick={handleGoToAccount}
              >
                <User size={22} />
              </button>
              <button
                type="button"
                className={`icon-toggle-button relative ${isToggleRouteActive('/cart') ? 'icon-toggle-button-active' : 'text-gizmos-text'}`}
                aria-label="Your cart"
                aria-pressed={isToggleRouteActive('/cart')}
                onClick={() => handleToggleRoute('/cart')}
              >
                <ShoppingCart size={24} />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[var(--color-accent-orange)] px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[156px] md:h-[88px]" />

      <div
        className={`header-category-shell fixed inset-x-0 top-[156px] z-[71] origin-top overflow-hidden text-gizmos-text transition-[max-height,opacity,transform] duration-500 ease-out lg:relative lg:top-auto ${
          isMobileCategoryVisible
            ? shouldHideCategoryTabs
              ? 'max-h-[240px] opacity-100 translate-y-0'
              : 'max-h-[420px] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        } ${
          isDesktopCategoryVisible ? 'lg:max-h-24 lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto' : 'lg:max-h-0 lg:opacity-0 lg:-translate-y-2 lg:pointer-events-none'
        }`}
      >
        <div className="relative container mx-auto">
          <nav
            className="hidden items-center justify-center gap-2 overflow-x-auto px-3 py-2.5 text-[12px] font-bold uppercase tracking-wider lg:flex"
            aria-label="Category navigation"
          >
            {categoryNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2.5 whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text hover:text-[var(--color-accent-orange)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-gizmos-border px-4 py-4 lg:hidden">
            <div className="grid grid-cols-5 gap-2">
              <button
                type="button"
                className={`header-mobile-glass-card flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isProductsRouteActive ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text'
                }`}
                onClick={handleGoToProducts}
              >
                <span className="text-[11px] leading-none">All</span>
                <span>Products</span>
              </button>
              <button
                type="button"
                className={`header-mobile-glass-card flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isToggleRouteActive('/about') ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text'
                }`}
                onClick={() => handleToggleRoute('/about')}
              >
                <Info size={16} />
                <span>About</span>
              </button>
              <button
                type="button"
                className={`header-mobile-glass-card relative flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isToggleRouteActive('/wishlist') ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text'
                }`}
                onClick={() => handleToggleRoute('/wishlist')}
              >
                <Heart size={16} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
                {wishlistCount > 0 ? (
                  <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] text-[var(--color-accent-orange)]">
                    {wishlistCount}
                  </span>
                ) : null}
                <span>Saved</span>
              </button>
              <button
                type="button"
                className="header-mobile-glass-card flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-gizmos-text"
                onClick={handleGoToAccount}
              >
                <User size={16} />
                <span>Account</span>
              </button>
              <button
                type="button"
                className={`header-mobile-glass-card relative flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isToggleRouteActive('/cart') ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text'
                }`}
                onClick={() => handleToggleRoute('/cart')}
              >
                <ShoppingCart size={16} />
                {cartCount > 0 ? (
                  <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] text-[var(--color-accent-orange)]">
                    {cartCount}
                  </span>
                ) : null}
                <span>Cart</span>
              </button>
            </div>

            {!shouldHideCategoryTabs ? (
              <div className="grid grid-cols-2 gap-2">
                {categoryNavItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `header-mobile-glass-card rounded-2xl px-3 py-3 text-center text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                        isActive ? 'text-[var(--color-accent-orange)]' : 'text-gizmos-text hover:text-[var(--color-accent-orange)]'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderGizmos;
