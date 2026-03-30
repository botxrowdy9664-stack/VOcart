import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../data/products/featuredProducts';
import { allProducts } from '../data/catalog';
import { formatPrice } from '../utils/currency';

const MotionDiv = motion.div;

const shuffleProducts = (items) => {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
};

const getFeaturedTags = (tags = []) => {
  const maxCharacters = 22;
  let usedCharacters = 0;

  return tags.filter((tag, index) => {
    const nextLength = usedCharacters + tag.length;
    const withinLimit = index < 3 && nextLength <= maxCharacters;

    if (withinLimit) {
      usedCharacters = nextLength;
    }

    return withinLimit;
  });
};

const getTopRatedBrand = (product) => {
  const [primaryTag] = product.tags ?? [];

  if (primaryTag) {
    return primaryTag;
  }

  return product.name.split(/\s+/)[0];
};

const ProductTabsGizmos = ({
  title,
  variant = 'standard',
  onToggleCart,
  wishlistItems = [],
  onToggleWishlist,
  cartItemIds = [],
}) => {
  const headingId = `${title.toLowerCase().replace(/\s+/g, '-')}-heading`;

  const resolveProduct = (product) => {
    const matchedProduct = allProducts.find((item) => item.name === product.name && item.category === product.category);

    if (!matchedProduct) {
      return {
        ...product,
        uid: `${variant}-${product.id}`,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${product.id}`,
      };
    }

    return {
      ...matchedProduct,
      ...product,
      uid: matchedProduct.uid,
      slug: matchedProduct.slug,
      sources: matchedProduct.sources,
      rating: matchedProduct.rating,
      reviewCount: matchedProduct.reviewCount,
      popularityScore: matchedProduct.popularityScore,
      price: Number(product.price ?? matchedProduct.price),
      tags: product.tags ?? matchedProduct.tags ?? [],
      description: product.description ?? matchedProduct.description,
      delivery: product.delivery ?? matchedProduct.delivery,
      img: product.img ?? matchedProduct.img,
      color: product.color ?? matchedProduct.color,
    };
  };

  const featuredSelection = (featuredProducts['Show All'] ?? []).slice(0, 5).map(resolveProduct);
  const [topRatedSelection] = useState(() => {
    const groupedProducts = allProducts
      .filter((product) => product.sources?.includes('top-rated'))
      .reduce((groups, product) => {
        if (!groups[product.category]) {
          groups[product.category] = [];
        }

        groups[product.category].push(product);
        return groups;
      }, {});

    return Object.values(groupedProducts).flatMap((products) => {
      const randomizedProducts = shuffleProducts(products);
      const count = Math.min(randomizedProducts.length, 1 + Math.floor(Math.random() * 2));
      return randomizedProducts.slice(0, count);
    });
  });

  const sectionProducts = variant === 'featured' ? featuredSelection : topRatedSelection;

  return (
    <section
      className={`${variant === 'featured' ? 'bg-gizmos-yellow' : 'bg-white'} px-4 py-16 md:px-8 md:py-20`}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-4 border-b border-gizmos-border pb-8 md:mb-12">
          <div>
            <h2 id={headingId} className="text-3xl font-black uppercase tracking-tighter text-gizmos-text sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-gray-500 sm:text-base">
              {variant === 'featured'
                ? 'A compact handpicked set with only five standout products for faster browsing.'
                : 'A mixed random lineup with 1-2 products from different categories, refreshed on each load.'}
            </p>
          </div>
        </div>

        <div
          className={
            variant === 'featured'
              ? 'grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5'
              : 'grid grid-cols-2 gap-4 pb-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
          }
        >
          <AnimatePresence mode="wait">
            {sectionProducts.map((product, index) => {
              const isInCart = cartItemIds.includes(product.uid);
              const isWishlisted = wishlistItems.some((item) => item.uid === product.uid);
              const cartButtonClass = isInCart
                ? 'cta-button-neutral cart-button-active'
                : 'cta-button-green';

              return (
                <MotionDiv
                  key={`${variant}-${product.uid}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                  className={`group relative flex min-w-0 flex-col transition-all ${
                    variant === 'featured'
                      ? 'glass-panel rounded-[26px] p-2 sm:rounded-[34px] sm:p-3'
                      : 'h-full'
                  }`}
                >
                  {variant === 'featured' ? (
                    <article className="night-solid-card glass-card flex h-full min-w-0 flex-col rounded-[22px] p-1.5 sm:rounded-[30px] sm:p-2">
                      <Link
                        to={`/product/${product.slug}`}
                        className="relative h-36 overflow-hidden rounded-[18px] bg-white sm:h-60 lg:h-56 xl:h-60"
                      >
                        <div className="absolute inset-0 z-10 flex items-center justify-center text-xs font-medium text-[#5D6BAA]">
                          Image Not Available
                        </div>
                        {product.img ? (
                          <img
                            src={product.img}
                            alt={product.name}
                            className="relative z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.opacity = '0';
                            }}
                          />
                        ) : null}
                        <div className="absolute -right-[1px] -top-[1px] z-30 rounded-bl-xl bg-white px-2 py-1 text-[11px] font-bold text-[var(--color-accent-orange)] sm:rounded-bl-2xl sm:px-3 sm:text-base">
                          {formatPrice(product.price)}
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 z-30 rounded-full border border-white/70 bg-white/55 px-2 py-1 text-center text-[8px] font-semibold text-[#111827] shadow-[0_8px_18px_rgba(15,23,42,0.10)] backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[10px]">
                          {product.delivery}
                        </div>
                      </Link>

                      <div className="flex flex-1 min-w-0 flex-col gap-1.5 px-1 pb-1 pt-2 sm:gap-2 sm:px-2 sm:pb-2 sm:pt-3">
                        <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                          <Link to={`/product/${product.slug}`} className="line-clamp-2 text-[0.84rem] font-semibold leading-tight text-[#111827] sm:line-clamp-1 sm:text-[1.2rem]">
                            {product.name}
                          </Link>
                          <Link
                            to={`/product/${product.slug}`}
                            className="mt-0.5 shrink-0 text-[10px] font-medium text-[var(--color-accent-orange)] transition-colors hover:text-gizmos-text sm:mt-1 sm:text-sm"
                          >
                            Order Now <ArrowRight size={12} className="inline-block" />
                          </Link>
                        </div>

                        <p className="line-clamp-2 text-[10px] leading-4 text-[#3F3F46] sm:text-[12px] sm:leading-5">
                          {product.description}
                        </p>

                        <div className="flex flex-nowrap gap-1 overflow-hidden sm:gap-1.5">
                          {getFeaturedTags(product.tags).map((tag) => (
                            <span
                              key={tag}
                              className="max-w-[72px] shrink-0 truncate rounded-full border border-[#E5E7EB] bg-white px-1.5 py-1 text-[8px] font-medium text-[#18181B] sm:max-w-[110px] sm:px-2.5 sm:text-[10px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleCart(product)}
                          className={`mt-auto w-full rounded-full px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.12em] ${cartButtonClass}`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <ShoppingCart size={14} />
                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                          </span>
                        </button>
                      </div>
                    </article>
                  ) : (
                    <article className="night-solid-card glass-card flex min-w-0 flex-col rounded-[28px] p-2.5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_28px_52px_rgba(15,23,42,0.12)] sm:rounded-[34px] sm:p-4">
                      <Link
                        to={`/product/${product.slug}`}
                        className="relative block aspect-[4/4.8] overflow-hidden rounded-[24px] bg-white sm:rounded-[28px]"
                      >
                        <div className="absolute left-2.5 top-2.5 z-20 rounded-full bg-white px-2 py-1 text-[8px] font-medium text-[#161616] shadow-[0_6px_14px_rgba(0,0,0,0.08)] sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
                          {getTopRatedBrand(product)}
                        </div>
                        <div
                          className="absolute inset-0 opacity-70"
                          style={{
                            background: `radial-gradient(circle at top, #ffffff 0%, ${product.color}66 44%, transparent 78%)`,
                          }}
                        />
                        <img
                          src={product.img}
                          alt={product.name}
                          className="relative z-10 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-col px-0.5 pt-2 sm:px-1 sm:pt-3">
                        <div className="mb-1 flex items-center justify-between gap-1.5">
                          <span className="text-[10px] font-medium text-[var(--color-accent-orange)] sm:text-[13px]">Best Seller</span>
                          <button
                            type="button"
                            aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
                            onClick={() => onToggleWishlist?.(product)}
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-colors sm:h-9 sm:w-9 ${
                              isWishlisted
                                ? 'bg-[#fff1f2] text-[#ff4a58]'
                                : 'bg-white/92 text-[#ff4a58] hover:bg-[#fff1f2]'
                            }`}
                          >
                            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        <Link
                          to={`/product/${product.slug}`}
                          className="line-clamp-2 text-[0.84rem] font-medium leading-[1.12] tracking-[-0.015em] text-[#171717] sm:text-[1.18rem]"
                        >
                          {product.name}
                        </Link>

                        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-end sm:gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] text-[#8a8a8a] sm:text-[12px]">Price</p>
                            <p className="price-accent mt-0.5 truncate text-[0.88rem] font-semibold leading-none tracking-[-0.02em] sm:text-[1.22rem]">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onToggleCart(product)}
                            className={`w-full rounded-full px-3 py-2 text-[10px] font-semibold transition-all sm:min-w-[142px] sm:w-auto sm:px-5 sm:py-3 sm:text-[13px] ${
                              isInCart ? 'cta-button-neutral cart-button-active' : 'cta-button-green'
                            }`}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <ShoppingCart size={16} />
                              {isInCart ? 'Added' : 'ADD'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  )}
                </MotionDiv>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductTabsGizmos;
