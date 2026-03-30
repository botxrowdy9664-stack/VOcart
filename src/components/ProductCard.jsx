import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const burstAngles = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg'];

const WishlistSpark = ({ effect }) => {
  if (!effect) {
    return null;
  }

  return (
    <div className="wishlist-burst pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {burstAngles.map((angle) => (
        <span
          key={angle}
          className="wishlist-ray"
          style={{ '--angle': angle, '--distance': '18px' }}
        />
      ))}
    </div>
  );
};

const ProductCard = ({
  product,
  onToggleCart,
  compact = false,
  minimal = false,
  recentStyle = false,
  hideDescription = false,
  isWishlisted = false,
  onToggleWishlist,
  isInCart = false,
}) => {
  const [isCartAnimating, setIsCartAnimating] = React.useState(false);
  const [heartEffect, setHeartEffect] = React.useState(null);

  const handleCartToggle = () => {
    onToggleCart?.(product);
    setIsCartAnimating(true);
    window.setTimeout(() => setIsCartAnimating(false), 700);
  };

  const handleWishlistToggle = () => {
    setHeartEffect('active');
    onToggleWishlist?.(product);
    window.setTimeout(() => setHeartEffect(null), 520);
  };

  const cartButtonClass = isInCart
    ? 'cta-button-neutral cart-button-active'
    : 'cta-button-green';

  const cartButtonLabel = isInCart ? 'Remove from Cart' : 'Add to Cart';
  const shortCartButtonLabel = isInCart ? 'Remove from Cart' : 'Add to Cart';

  if (recentStyle) {
    return (
      <article className="night-solid-card glass-card group flex h-full min-w-0 flex-col rounded-[28px] p-2.5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_52px_rgba(15,23,42,0.12)] sm:rounded-[34px] sm:p-4">
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[3/3.9] overflow-hidden rounded-[26px] bg-white sm:rounded-[28px]"
        >
          <div className="absolute left-2.5 top-2.5 z-20 rounded-full bg-white/95 px-2 py-1 text-[8px] font-medium text-[#161616] shadow-[0_6px_14px_rgba(0,0,0,0.08)] sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
            New Drop
          </div>
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        <div className="flex flex-1 min-w-0 flex-col px-0.5 pt-2 sm:px-1 sm:pt-3">
          <div className="mb-1 flex items-center justify-between gap-1.5">
            <span className="text-[10px] font-medium text-[var(--color-accent-orange)] sm:text-[13px]">Recently Added</span>
            <button
              type="button"
              aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
              onClick={handleWishlistToggle}
              className={`relative overflow-visible flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-colors sm:h-9 sm:w-9 ${
                isWishlisted ? 'bg-[#fff1f2] text-[#ff4a58]' : 'bg-white/92 text-[#ff4a58] hover:bg-[#fff1f2]'
              }`}
            >
              <WishlistSpark effect={heartEffect} />
              <Heart size={14} className={heartEffect ? 'wishlist-heart-icon-active' : ''} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-2 text-left text-[0.84rem] font-medium leading-[1.12] tracking-[-0.015em] text-[#171717] sm:text-[1.16rem]"
          >
            {product.name}
          </Link>

          {!hideDescription ? (
            <p className="mt-1 line-clamp-2 text-[10px] leading-[1.3] text-[#8a8a8a] sm:text-[13px] sm:leading-5">
              {product.description}
            </p>
          ) : null}

          <div className={`mt-auto ${hideDescription ? 'pt-2' : 'pt-1.5'}`}>
            <div className="flex items-end justify-between gap-1.5 sm:gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#8a8a8a] sm:text-[12px]">Price</p>
                <p className="price-accent mt-0.5 truncate text-[0.86rem] font-semibold leading-none tracking-[-0.02em] sm:text-[1.22rem]">
                  {formatPrice(product.price)}
                </p>
              </div>

              <Link
                to={`/product/${product.slug}`}
                className="cta-button-orange min-w-[76px] shrink-0 rounded-full px-2.5 py-2 text-center text-[10px] font-semibold transition-colors sm:min-w-[136px] sm:px-5 sm:py-3 sm:text-[13px]"
              >
                Buy Now
              </Link>
            </div>

            <button
              type="button"
              onClick={handleCartToggle}
              className={`mt-1.5 w-full rounded-full px-3 py-2 text-[10px] font-semibold transition-all sm:mt-2 sm:px-4 sm:py-3 sm:text-[13px] ${cartButtonClass} ${
                isCartAnimating ? 'scale-[0.98] shadow-[var(--shadow-brand-ring)]' : ''
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart size={15} className={isCartAnimating ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                {isCartAnimating ? shortCartButtonLabel : cartButtonLabel}
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (minimal) {
    return (
      <article className="night-solid-card glass-card group relative flex h-full flex-col overflow-hidden rounded-[28px] p-4 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-5">
        <div className="relative mb-4">
          <button
            type="button"
            aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
            onClick={handleWishlistToggle}
            className={`absolute right-3 top-3 z-20 relative overflow-visible flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all ${
              isWishlisted ? 'scale-110 text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
          >
              <WishlistSpark effect={heartEffect} />
            <Heart size={16} className={heartEffect ? 'wishlist-heart-icon-active' : ''} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="relative flex aspect-[4/4.2] items-center justify-center overflow-hidden rounded-[24px] bg-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/5" />
            <img
              src={product.img}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {product.delivery ? (
              <div className="absolute bottom-3 left-3 right-3 z-20 rounded-full bg-white/55 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-gizmos-text shadow-lg backdrop-blur-md">
                {product.delivery}
              </div>
            ) : null}
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-orange)]">{product.category}</span>
          <Link to={`/product/${product.slug}`} className="text-lg font-bold leading-tight text-gizmos-text transition-colors group-hover:text-[var(--color-accent-orange)]">
            {product.name}
          </Link>
          <div className="flex items-center justify-center gap-1 text-[var(--color-accent-orange)] sm:justify-start">
            <Star size={13} fill="currentColor" />
            <span className="text-[11px] font-bold text-gray-400">{product.rating?.toFixed(1) ?? '4.8'}</span>
          </div>
          <p className="price-accent text-2xl font-black">{formatPrice(product.price)}</p>

          <div className="mt-auto flex flex-col gap-2 pt-2">
            <Link
              to={`/product/${product.slug}`}
              className="cta-button-orange w-full rounded-full px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] transition-colors"
            >
              Buy Now
            </Link>
            <button
              type="button"
              onClick={handleCartToggle}
              className={`w-full rounded-full px-4 py-3 transition-all ${cartButtonClass} ${isCartAnimating ? 'scale-95 shadow-[var(--shadow-brand-ring)]' : ''}`}
            >
              <span className="flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.16em]">
                <ShoppingCart size={14} className={isCartAnimating ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                {isCartAnimating ? shortCartButtonLabel : cartButtonLabel}
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="night-solid-card glass-card group relative flex h-full flex-col overflow-hidden rounded-[28px] p-4 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-5">
      <div className="relative mb-5">
        <button
          type="button"
          aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
          onClick={handleWishlistToggle}
          className={`absolute right-3 top-3 z-20 relative overflow-visible flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all ${
            isWishlisted ? 'scale-110 text-red-500' : 'text-gray-300 hover:text-red-500'
          }`}
        >
          <WishlistSpark effect={heartEffect} />
          <Heart size={16} className={heartEffect ? 'wishlist-heart-icon-active' : ''} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <Link
          to={`/product/${product.slug}`}
          className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[24px] bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/5" />
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {product.delivery ? (
            <div className="absolute bottom-3 left-3 right-3 z-20 rounded-full bg-white/55 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-gizmos-text shadow-lg backdrop-blur-md">
              {product.delivery}
            </div>
          ) : null}
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="glass-chip rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gizmos-text">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[var(--color-accent-orange)]">
            <Star size={13} fill="currentColor" />
            <span className="text-[11px] font-bold text-gray-400">{product.rating?.toFixed(1) ?? '4.8'}</span>
          </div>
        </div>

        <Link to={`/product/${product.slug}`} className="text-lg font-bold leading-tight text-gizmos-text transition-colors group-hover:text-[var(--color-accent-orange)]">
          {product.name}
        </Link>

        <p className={`${compact ? 'line-clamp-2' : 'line-clamp-3'} text-sm leading-6 text-gray-500`}>
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <span>{product.reviewCount?.toLocaleString('en-IN') ?? '120'} reviews</span>
          <span>{product.sources?.includes('featured') ? 'Popular pick' : 'Trusted choice'}</span>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">Price</p>
            <p className="mt-2 text-2xl font-black text-gizmos-text">{formatPrice(product.price)}</p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="cta-button-orange w-full rounded-full px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] transition-colors"
            >
              Buy Now
            </Link>
            <button
              type="button"
              onClick={handleCartToggle}
              className={`w-full rounded-full px-4 py-3 transition-all ${cartButtonClass} ${isCartAnimating ? 'scale-95 shadow-[var(--shadow-brand-ring)]' : ''}`}
            >
              <span className="flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.16em]">
                <ShoppingCart size={14} className={isCartAnimating ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                {isCartAnimating ? shortCartButtonLabel : shortCartButtonLabel}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
