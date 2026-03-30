import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { searchProducts } from '../data/catalog';
import { brandName, brandTitleSuffix } from '../data/branding';

const shuffleProducts = (items) => {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
};

const ShopPage = ({ onAddToCart, onToggleCart, wishlistItems, onToggleWishlist, cartItemIds }) => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('search') ?? '';
  const products = React.useMemo(() => shuffleProducts(searchProducts(searchTerm)), [searchTerm]);

  return (
    <>
      <SEOHead
        title={searchTerm ? `Search: ${searchTerm}${brandTitleSuffix}` : `All Products${brandTitleSuffix}`}
        description={`Browse the full ${brandName} catalog with category-wise and search-based discovery.`}
      />
      <section className="bg-[#EEEDE8] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-orange)]">Shop</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">
            {searchTerm ? `Results for "${searchTerm}"` : 'All Products'}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-500">
            Browse every available product, open detail pages, and add items straight into the cart.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-400">{products.length} products found</p>
            <Link to="/cart" className="button-soft-hover text-sm font-bold text-gizmos-text transition-colors">
              Go to cart
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
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
        </div>
      </section>
    </>
  );
};

export default ShopPage;
