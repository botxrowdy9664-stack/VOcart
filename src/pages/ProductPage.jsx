import React from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { allProducts, findProductBySlug } from '../data/catalog';
import { brandName, brandTitleSuffix } from '../data/branding';
import { formatPrice } from '../utils/currency';
import ProductCard from '../components/ProductCard';

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
          style={{ '--angle': angle, '--distance': '20px' }}
        />
      ))}
    </div>
  );
};

const ProductPage = ({ onAddToCart, onToggleCart, wishlistItems, onToggleWishlist, cartItemIds }) => {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const product = findProductBySlug(productSlug);
  const [isCartAnimating, setIsCartAnimating] = React.useState(false);
  const [heartEffect, setHeartEffect] = React.useState(null);
  const [areCommentsOpen, setAreCommentsOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setAreCommentsOpen(false);
    setHeartEffect(null);
    setIsCartAnimating(false);
  }, [productSlug]);

  if (!product) {
    return (
      <section className="container mx-auto px-4 py-20 md:px-8">
        <p className="text-lg font-semibold text-gizmos-text">Product not found.</p>
      </section>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item.uid === product.uid);
  const isInCart = cartItemIds.includes(product.uid);
  const ratingValue = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 120;
  const productValues = [
    ...product.tags,
    'Bluetooth Support',
    'Ultra Display',
    'Fast Pairing',
    'Long Battery',
    'Premium Build',
  ].slice(0, 6);

  const ratingBars = [
    { stars: 5, width: 86 },
    { stars: 4, width: 28 },
    { stars: 3, width: 14 },
    { stars: 2, width: 10 },
    { stars: 1, width: 6 },
  ];

  const defaultComments = [
    {
      id: 'alex-mathio',
      author: 'Alex Mathio',
      date: '13 Oct 2024',
      text:
        `${brandName} ka product quality aur finish strong lagta hai. Daily use me smooth performance mila aur design clean premium feel deta hai.`,
    },
    {
      id: 'rhea-kapoor',
      author: 'Rhea Kapoor',
      date: '22 Nov 2024',
      text:
        'Packaging achhi thi, buttons responsive lage aur overall experience kaafi smooth raha. Is range me value strong feel hoti hai.',
    },
    {
      id: 'aman-verma',
      author: 'Aman Verma',
      date: '08 Jan 2025',
      text:
        'Battery backup aur connectivity dono reliable lage. Casual aur daily heavy use dono me kaam sahi chala.',
    },
  ];

  const visibleComments = areCommentsOpen ? defaultComments : defaultComments.slice(0, 1);
  const relatedProducts = allProducts.filter((item) => item.uid !== product.uid).slice(0, 5);
  const cartButtonClass = isInCart
    ? 'cta-button-neutral cart-button-active'
    : 'cta-button-green';

  const handleAnimatedAddToCart = () => {
    if (isInCart) {
      return;
    }

    onAddToCart(product);
    setIsCartAnimating(true);
    window.setTimeout(() => setIsCartAnimating(false), 700);
  };

  const handleAnimatedCartToggle = () => {
    onToggleCart(product);
    setIsCartAnimating(true);
    window.setTimeout(() => setIsCartAnimating(false), 700);
  };

  const handleAnimatedWishlistToggle = () => {
    setHeartEffect('active');
    onToggleWishlist(product);
    window.setTimeout(() => setHeartEffect(null), 520);
  };

  return (
    <>
      <SEOHead
        title={`${product.name}${brandTitleSuffix}`}
        description={product.description}
      />
      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="button-soft-hover transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="button-soft-hover transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-gizmos-text">{product.name}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cta-button-neutral inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <div className="night-solid-panel glass-panel overflow-hidden rounded-[36px] p-5 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <div className="night-solid-panel glass-card rounded-[32px] p-6 sm:p-10">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="mx-auto h-[320px] w-full max-w-xl object-contain drop-shadow-[0_35px_40px_rgba(0,0,0,0.14)] sm:h-[420px]"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((item) => (
                    <Link key={item} to={`/product/${product.slug}`} className="night-solid-panel glass-card rounded-[22px] p-3 sm:p-4">
                      <img
                        src={product.img}
                        alt={`${product.name} preview ${item}`}
                        className="h-24 w-full object-contain sm:h-28"
                        loading="lazy"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="glass-chip rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gizmos-text">
                  {product.category}
                </span>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">{product.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5 text-[var(--color-accent-orange)]">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold text-gizmos-text">{product.rating?.toFixed(1) ?? '4.8'}</span>
                  </div>
                  <span>{reviewCount.toLocaleString('en-IN')} verified reviews</span>
                  <span>{product.delivery}</span>
                </div>

                <p className="mt-5 text-base leading-8 text-gray-500">{product.description}</p>

                <div className="mt-7">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-gizmos-text">Product Values</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {productValues.map((value) => (
                      <span
                        key={value}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="night-solid-panel glass-card mt-7 rounded-[28px] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300">Price</p>
                  <p className="mt-2 text-4xl font-black text-gizmos-text">{formatPrice(product.price)}</p>
                  <p className="mt-2 text-sm font-medium text-gray-500">Inclusive of premium delivery support.</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/cart"
                    onClick={handleAnimatedAddToCart}
                    className={`cta-button-orange w-full rounded-full px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] transition-all sm:w-auto ${
                      isCartAnimating ? 'scale-95 shadow-[var(--shadow-brand-ring)]' : ''
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart size={16} className={isCartAnimating ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                      {isInCart ? 'Go to Cart' : isCartAnimating ? 'Added to Cart' : 'Buy Now'}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleAnimatedCartToggle}
                    className={`w-full rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.18em] transition-colors sm:w-auto ${cartButtonClass} ${isCartAnimating ? 'scale-95 shadow-[var(--shadow-brand-ring)]' : ''}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart size={16} className={isCartAnimating ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAnimatedWishlistToggle}
                    className={`relative w-full rounded-full border px-6 py-4 text-sm font-black uppercase tracking-[0.18em] transition-colors sm:w-auto ${
                      isWishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500'
                    }`}
                    >
                      <WishlistSpark effect={heartEffect} />
                      <span className="flex items-center justify-center gap-2">
                      <Heart size={16} className={heartEffect ? 'wishlist-heart-icon-active' : ''} fill={isWishlisted ? 'currentColor' : 'none'} />
                      {isWishlisted ? 'Liked' : 'Like'}
                    </span>
                  </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="night-solid-panel glass-card rounded-[24px] p-5">
                    <div className="flex items-center gap-3 text-gizmos-text">
                      <Truck size={18} className="text-[var(--color-accent-orange)]" />
                      <p className="font-black">Shipping</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-500">Fast dispatch, secure packing, and live order updates for every purchase.</p>
                  </div>
                  <div className="night-solid-panel glass-card rounded-[24px] p-5">
                    <div className="flex items-center gap-3 text-gizmos-text">
                      <ShieldCheck size={18} className="text-[var(--color-accent-orange)]" />
                      <p className="font-black">Protection</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-500">Quality-checked product support with dependable post-purchase assistance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="night-solid-panel glass-panel mt-12 rounded-[36px] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-black tracking-tight text-gizmos-text sm:text-3xl">Rating & Reviews</h2>
              <button
                type="button"
                onClick={() => setAreCommentsOpen((current) => !current)}
                className="cta-button-neutral inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] transition-colors"
              >
                {areCommentsOpen ? 'Hide Comments' : 'Open All Comments'}
                {areCommentsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
                <div>
                  <div className="flex items-end gap-2 text-gizmos-text">
                    <span className="text-7xl font-black leading-none sm:text-8xl">{ratingValue.toFixed(1)}</span>
                    <span className="pb-2 text-2xl font-semibold text-gray-300">/ 5</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">({reviewCount.toLocaleString('en-IN')} New Reviews)</p>
                </div>

                <div className="space-y-3 pt-2">
                  {ratingBars.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <div className="flex min-w-[26px] items-center gap-1 text-sm font-bold text-[var(--color-accent-orange)]">
                        <Star size={14} fill="currentColor" />
                        <span className="text-gizmos-text">{item.stars}</span>
                      </div>
                      <div className="h-2.5 flex-1 rounded-full bg-gray-100">
                        <div className="h-2.5 rounded-full bg-gizmos-text" style={{ width: `${item.width}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {visibleComments.map((comment, index) => (
                  <div key={comment.id} className={`night-solid-panel glass-card rounded-[28px] p-6 ${index > 0 ? 'hidden sm:block' : ''}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black text-gizmos-text">{comment.author}</h3>
                        <div className="mt-2 flex items-center gap-1 text-[var(--color-accent-orange)]">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star key={starIndex} size={16} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{comment.date}</span>
                    </div>

                    <p className="mt-5 max-w-[56ch] text-sm leading-7 text-gray-500">
                      {comment.text}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={product.img}
                        alt={`${product.name} reviewer preview`}
                        className="h-14 w-14 rounded-full border border-gizmos-border bg-white object-cover p-1"
                        loading="lazy"
                      />
                      <div className="h-1.5 flex-1 rounded-full bg-gray-100">
                        <div className="h-1.5 w-20 rounded-full bg-gizmos-text" />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="night-solid-panel glass-card rounded-[28px] border-dashed p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-black text-gizmos-text">Write a comment</h3>
                      <p className="mt-1 text-sm text-gray-500">Comment karne ke liye tumhe login karna hi padega.</p>
                    </div>
                    <Link
                      to="/login-services-down"
                      className="cta-button-neutral rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] transition-colors"
                    >
                      Login to Comment
                    </Link>
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white bg-white px-5 py-4 text-sm leading-7 text-gray-400">
                    Login required to add a comment. Once services resume, you will be able to write your review here.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="night-solid-panel glass-panel mt-12 rounded-[36px] p-6 text-center sm:p-8 lg:p-10">
              <h2 className="text-3xl font-black tracking-tight text-gizmos-text">You might also like</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">More picks that match the same shopping vibe and product interest.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {relatedProducts.map((item) => (
                  <ProductCard
                    key={item.uid}
                    product={item}
                    onAddToCart={onAddToCart}
                    onToggleCart={onToggleCart}
                    isWishlisted={wishlistItems.some((wishlistItem) => wishlistItem.uid === item.uid)}
                    onToggleWishlist={onToggleWishlist}
                    isInCart={cartItemIds.includes(item.uid)}
                    recentStyle
                    hideDescription
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductPage;
