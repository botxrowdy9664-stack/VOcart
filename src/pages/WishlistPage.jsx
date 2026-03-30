import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { brandTitleSuffix } from '../data/branding';

const WishlistPage = ({ wishlistItems, onAddToCart, onToggleCart, onToggleWishlist, cartItemIds }) => {
  return (
    <>
      <SEOHead
        title={`Wishlist${brandTitleSuffix}`}
        description="Review the products you liked and move them into the cart whenever you're ready."
      />
      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-orange)]">Wishlist</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">Liked Products</h1>
            </div>
            <Link to="/shop" className="button-soft-hover text-sm font-bold text-gizmos-text transition-colors">
              Continue shopping
            </Link>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product.uid}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleCart={onToggleCart}
                  recentStyle
                  isWishlisted
                  onToggleWishlist={onToggleWishlist}
                  isInCart={cartItemIds.includes(product.uid)}
                />
              ))}
            </div>
          ) : (
            <div className="night-solid-panel glass-panel mt-10 rounded-[32px] border-dashed p-12 text-center">
              <p className="text-lg font-semibold text-gizmos-text">Your wishlist is empty.</p>
              <p className="mt-3 text-sm text-gray-500">Product cards par heart button dabake items yahan save ho jayenge.</p>
              <Link to="/shop" className="cta-button-orange mt-5 inline-flex rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em]">
                Explore products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistPage;
