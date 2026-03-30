import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { categoryDefinitions, getCategoryPriceBounds, getProductsForCategory } from '../data/catalog';
import { brandName, brandTitleSuffix } from '../data/branding';
import { formatPrice } from '../utils/currency';
import { clampPriceInput } from '../utils/shop';

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'reviewed', label: 'Most Reviewed' },
  { value: 'name-asc', label: 'A to Z' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
];

const CategoryPage = ({ onAddToCart, onToggleCart, wishlistItems, onToggleWishlist, cartItemIds }) => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const category = categoryDefinitions.find((item) => item.slug === categorySlug);
  const products = getProductsForCategory(categorySlug);
  const priceBounds = getCategoryPriceBounds(categorySlug);
  const [sortBy, setSortBy] = useState('popular');
  const [minPrice, setMinPrice] = useState(priceBounds.min);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [draftMinPrice, setDraftMinPrice] = useState(String(priceBounds.min));
  const [draftMaxPrice, setDraftMaxPrice] = useState(String(priceBounds.max));
  const [priceMessage, setPriceMessage] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortBy('popular');
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
    setDraftMinPrice(String(priceBounds.min));
    setDraftMaxPrice(String(priceBounds.max));
    setPriceMessage('');
  }, [categorySlug, priceBounds.min, priceBounds.max]);

  const applyPriceRange = () => {
    if (!products.length) {
      return;
    }

    const enteredMin = Number(draftMinPrice);
    const enteredMax = Number(draftMaxPrice);

    if (Number.isNaN(enteredMin) || Number.isNaN(enteredMax)) {
      setMinPrice(priceBounds.min);
      setMaxPrice(priceBounds.max);
      setDraftMinPrice(String(priceBounds.min));
      setDraftMaxPrice(String(priceBounds.max));
      setPriceMessage(`Please enter valid numbers between ${formatPrice(priceBounds.min)} and ${formatPrice(priceBounds.max)}.`);
      return;
    }

    let nextMin = clampPriceInput(enteredMin, priceBounds.min, priceBounds.max);
    let nextMax = clampPriceInput(enteredMax, priceBounds.min, priceBounds.max);
    const minWasClamped = nextMin !== enteredMin;
    const maxWasClamped = nextMax !== enteredMax;

    if (nextMin > nextMax) {
      nextMin = Math.min(nextMin, priceBounds.max);
      nextMax = Math.max(nextMax, nextMin);
      setPriceMessage(`Min price max se badi nahi ho sakti, isliye range ${formatPrice(nextMin)} se ${formatPrice(nextMax)} kar di gayi hai.`);
    } else if (minWasClamped || maxWasClamped) {
      setPriceMessage(`Entered value available range ke bahar thi, isliye ${formatPrice(nextMin)} se ${formatPrice(nextMax)} set kar diya gaya hai.`);
    } else {
      setPriceMessage('');
    }

    setMinPrice(nextMin);
    setMaxPrice(nextMax);
    setDraftMinPrice(String(nextMin));
    setDraftMaxPrice(String(nextMax));
  };

  const handlePriceInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      applyPriceRange();
    }
  };

  const handleSliderChange = (type, rawValue) => {
    const nextValue = Number(rawValue);

    if (type === 'min') {
      const safeMin = Math.min(nextValue, maxPrice);
      setMinPrice(safeMin);
      setDraftMinPrice(String(safeMin));
      setPriceMessage('');
      return;
    }

    const safeMax = Math.max(nextValue, minPrice);
    setMaxPrice(safeMax);
    setDraftMaxPrice(String(safeMax));
    setPriceMessage('');
  };

  const filteredProducts = useMemo(() => {
    const visibleProducts = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    return [...visibleProducts].sort((left, right) => {
      switch (sortBy) {
        case 'reviewed':
          return right.reviewCount - left.reviewCount;
        case 'name-asc':
          return left.name.localeCompare(right.name);
        case 'price-asc':
          return left.price - right.price;
        case 'price-desc':
          return right.price - left.price;
        case 'popular':
        default:
          return right.popularityScore - left.popularityScore;
      }
    });
  }, [maxPrice, minPrice, products, sortBy]);

  const range = Math.max(priceBounds.max - priceBounds.min, 1);
  const rangeStart = ((minPrice - priceBounds.min) / range) * 100;
  const rangeEnd = ((maxPrice - priceBounds.min) / range) * 100;

  if (!category) {
    return (
      <section className="container mx-auto px-4 py-20 md:px-8">
        <p className="text-lg font-semibold text-gizmos-text">Category not found.</p>
      </section>
    );
  }

  return (
    <>
      <SEOHead
        title={`${category.name}${brandTitleSuffix}`}
        description={`Browse ${category.name} products at ${brandName}.`}
      />
      <section className="bg-[#EEEDE8] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-orange)]">Category Page</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-gray-500">
            Category-wise browsing, smarter sorting, and price control so shoppers can quickly reach the right products.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="glass-panel h-fit rounded-[32px] p-6 sm:p-7">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--color-accent-orange)]">Categories</p>
              <div className="mt-5 flex flex-col gap-2">
                {categoryDefinitions.map((item) => {
                  const count = getProductsForCategory(item.slug).length;
                  const isActive = item.slug === categorySlug;

                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => navigate(`/category/${item.slug}`)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all ${
                        isActive
                          ? 'glass-chip text-[var(--color-accent-orange)] shadow-lg'
                          : 'bg-white text-gizmos-text hover:bg-[rgba(249,115,22,0.08)] hover:text-[var(--color-accent-orange)]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--color-accent-orange)]">Sort Products</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition-all ${
                      sortBy === option.value
                        ? 'cta-button-orange'
                        : 'glass-chip text-gray-500 hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-orange)]">Price Range</p>
                <span className="text-xs font-semibold text-gray-400">
                  {formatPrice(priceBounds.min)} - {formatPrice(priceBounds.max)}
                </span>
              </div>

              <div className="relative mt-8 h-6">
                <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
                <div
                  className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[var(--color-accent-orange)]"
                  style={{ left: `${rangeStart}%`, width: `${Math.max(rangeEnd - rangeStart, 0)}%` }}
                />
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={minPrice}
                  onChange={(event) => handleSliderChange('min', event.target.value)}
                  className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-lg"
                />
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={maxPrice}
                  onChange={(event) => handleSliderChange('max', event.target.value)}
                  className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gizmos-text [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <label className="glass-chip rounded-2xl px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Min</span>
                  <input
                    type="number"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    value={draftMinPrice}
                    onChange={(event) => setDraftMinPrice(event.target.value)}
                    onKeyDown={handlePriceInputKeyDown}
                    className="mt-2 w-full bg-transparent text-base font-black text-gizmos-text outline-none"
                  />
                </label>
                <label className="glass-chip rounded-2xl px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Max</span>
                  <input
                    type="number"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    value={draftMaxPrice}
                    onChange={(event) => setDraftMaxPrice(event.target.value)}
                    onKeyDown={handlePriceInputKeyDown}
                    className="mt-2 w-full bg-transparent text-base font-black text-gizmos-text outline-none"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={applyPriceRange}
                className="cta-button-orange mt-4 w-full rounded-full px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors"
              >
                Search Price Range
              </button>

              <p className={`mt-4 text-sm ${priceMessage ? 'text-amber-600' : 'text-gray-400'}`}>
                {priceMessage || `Showing products between ${formatPrice(minPrice)} and ${formatPrice(maxPrice)}.`}
              </p>
            </div>
          </aside>

          <div>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400">{filteredProducts.length} products found</p>
                <p className="mt-1 text-sm text-gray-500">
                  Sorted by <span className="font-bold text-gizmos-text">{sortOptions.find((option) => option.value === sortBy)?.label}</span>
                </p>
              </div>
              <Link to="/shop" className="button-soft-hover text-sm font-bold text-gizmos-text transition-colors">
                View all products
              </Link>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.uid}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleCart={onToggleCart}
                    recentStyle
                    isWishlisted={wishlistItems.some((item) => item.uid === product.uid)}
                    onToggleWishlist={onToggleWishlist}
                    isInCart={cartItemIds.includes(product.uid)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-[32px] border-dashed p-10 text-center text-gray-500">
                No products matched this category filter. Try widening the selected price range.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
