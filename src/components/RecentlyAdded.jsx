import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { recentlyAddedProducts } from '../data/products/recentlyAddedProducts';
import { allProducts } from '../data/catalog';

const MotionDiv = motion.div;

const RecentlyAdded = ({ onAddToCart, onToggleCart, wishlistItems, onToggleWishlist, cartItemIds }) => {
  const products = recentlyAddedProducts.slice(0, 7).map((product) => {
    const matchedProduct = allProducts.find((item) => item.name === product.name && item.category === product.category);

    if (!matchedProduct) {
      return {
        ...product,
        uid: `recent-${product.id}`,
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
  });

  return (
    <section
      className="border-t border-gray-50 bg-[#F6F6F3] px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10"
      aria-labelledby="recently-added-heading"
    >
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-4 border-b border-gizmos-border pb-8 sm:mb-16">
          <div>
            <h2
              id="recently-added-heading"
              className="text-3xl font-black uppercase tracking-tighter text-gizmos-text sm:text-4xl"
            >
              Recently Added
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Fresh arrivals across wearables, accessories, home gadgets, and everyday electronics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product, index) => (
            <MotionDiv
              key={product.uid}
              className="h-full min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleCart={onToggleCart}
                compact
                recentStyle
                isWishlisted={wishlistItems.some((item) => item.uid === product.uid)}
                onToggleWishlist={onToggleWishlist}
                isInCart={cartItemIds.includes(product.uid)}
              />
            </MotionDiv>
          ))}
        </div>

        <div className="night-solid-banner glass-panel relative mt-16 flex flex-col items-center justify-between overflow-hidden rounded-[32px] p-6 sm:mt-20 sm:p-10 md:flex-row md:p-16 lg:p-20">
          <div className="z-10 text-center md:text-left">
            <h2 className="mb-6 text-3xl font-black text-gizmos-text sm:text-4xl md:text-5xl">
              Incredible features
              <br />
              and fresh new ideas
            </h2>
            <div className="mt-8 flex flex-col items-center gap-6 md:flex-row">
              <div className="cta-button-orange cursor-pointer rounded-full px-8 py-4 text-lg font-black transition-all sm:px-10 sm:py-5 sm:text-xl">
                20% OFF
              </div>
              <p className="max-w-xs text-sm font-bold text-gray-400">
                Valid until the end of the month for all gadgets and accessories.
              </p>
            </div>
          </div>

          <div className="group relative mt-10 md:mt-0">
            <div className="absolute inset-0 scale-150 rounded-full bg-white/50 blur-[80px] transition-transform duration-1000 group-hover:scale-175" />
            <img
              src="https://i.pinimg.com/1200x/a3/ec/dd/a3ecddca5c58f925dc86bb3360d7a879.jpg?auto=format&fit=crop&q=80&w=2070"
              alt="Feature wireless headphones"
              className="z-10 w-full max-w-xs scale-110 transform rounded-[20px] drop-shadow-2xl transition-transform duration-700 group-hover:rotate-0 sm:max-w-sm md:rotate-12 md:scale-125"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAdded;
