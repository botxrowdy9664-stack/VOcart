import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const MotionArticle = motion.article;

const slides = [
  {
    id: 1,
    eyebrow: 'Gaming Setup',
    title: 'Powerful hardware for smooth sessions',
    subtitle: 'High-performance gaming picks presented in a wider horizontal slider experience.',
    image: 'https://images.acer.com/is/image/acer/predator-helios-neo-16-phn16-72-4zone-backlit-on-wallpaper-logo-black-01?$Product-Cards-XL$',
    productName: 'Predator Helios Neo 16',
    productDesc: 'RTX graphics with high refresh display.',
    price: 138587,
    action: '/category/video-games',
  },
  {
    id: 2,
    eyebrow: 'Wireless Audio',
    title: 'Noise-free listening with rich detail',
    subtitle: 'Balanced sound, soft padding, and a focused shopping flow for premium headphones.',
    image: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/310090_qzoebe.png?tr=w-640',
    productName: 'Sony WH-1000XM5',
    productDesc: 'Wireless over-ear comfort with ANC.',
    price: 37899,
    action: '/category/headphones',
  },
  {
    id: 3,
    eyebrow: 'Smartphones',
    title: 'Fast, bright, and ready for daily use',
    subtitle: 'Latest phones featured inside a lighter storefront with glass surfaces and clearer CTAs.',
    image: 'https://m.media-amazon.com/images/I/71N8YkTS0TL._SX679_.jpg',
    productName: 'Galaxy S24 Ultra',
    productDesc: 'Flagship camera and AI-powered performance.',
    price: 129999,
    action: '/category/tablets-and-phones',
  },
  {
    id: 4,
    eyebrow: 'Modern Watches',
    title: 'Refined style for everyday wear',
    subtitle: 'Clean monochrome accessories with premium finishing and lighter visual layout.',
    image: 'https://cdn.shopify.com/s/files/1/0692/8321/7683/files/AX2440_480x480.jpg?v=1727352273',
    productName: 'Armani Exchange Man Watch',
    productDesc: 'Quartz movement with a black dial finish.',
    price: 15000,
    action: '/shop?search=watch',
  },
  
  
];

const HeroSliderGizmos = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const autoScroll = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(autoScroll);
  }, []);

  return (
    <section
      className="relative h-[calc(100svh-172px)] overflow-hidden border-b border-gizmos-border px-4 py-3 md:h-[calc(100svh-180px)] md:px-8 md:py-4"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto h-full">
        <div className="hero-slider-shell glass-panel flex h-full flex-col overflow-hidden rounded-[38px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="min-h-0 flex-1 overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <MotionArticle
                  key={slide.id}
                  initial={{ opacity: 0.3, y: 18 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="flex h-full w-full min-w-0 shrink-0 basis-full flex-col items-center justify-center gap-8 overflow-hidden px-2 py-4 lg:flex-row lg:gap-10 lg:px-4"
                >
                  <div className="min-w-0 flex-1 text-center lg:text-left">
                  <span className="glass-chip inline-flex rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--color-accent-orange)]">
                    {slide.eyebrow}
                  </span>
                  <h1
                    id={index === 0 ? 'hero-heading' : undefined}
                    className="hero-slider-title mt-5 max-w-xl text-4xl font-black leading-[0.95] tracking-tight text-gizmos-text sm:text-5xl lg:text-6xl"
                  >
                    {slide.title}
                  </h1>
                  <p className="hero-slider-subtitle mt-4 max-w-2xl text-base font-medium text-gray-500 sm:text-lg">
                    {slide.subtitle}
                  </p>

                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                    <button
                      type="button"
                      className="cta-button-orange rounded-full px-8 py-3 text-sm font-black uppercase tracking-[0.18em]"
                      onClick={() => navigate(slide.action)}
                    >
                      Explore Now
                    </button>
                    <div className="hero-starting-chip glass-chip rounded-full px-5 py-3 text-sm font-bold text-gizmos-text">
                      Starting at <span className="price-accent">{formatPrice(slide.price)}</span>
                    </div>
                  </div>
                </div>

                <div className="relative flex min-w-0 flex-1 flex-col items-center">
                  <div className="absolute inset-x-8 top-10 -z-10 h-40 rounded-full bg-orange-500/10 blur-3xl sm:inset-x-14" />
                  <img
                    src={slide.image}
                    alt={slide.productName}
                    className="h-[220px] w-full max-w-md object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,0.16)] sm:h-[280px] lg:h-[340px]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  <div className="glass-card mt-5 flex w-full max-w-sm flex-col items-center rounded-[28px] p-5 text-center sm:p-6 lg:absolute lg:bottom-2 lg:right-0 lg:mt-0 lg:items-start lg:text-left">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--color-accent-orange)]">
                      {slide.productName}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{slide.productDesc}</p>
                    <p className="mt-4 text-3xl font-black text-gizmos-text">
                      {index % 2 === 0 ? <span className="price-accent">{formatPrice(slide.price)}</span> : formatPrice(slide.price)}
                    </p>
                  </div>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'h-2.5 w-8 bg-[var(--color-accent-orange)]'
                    : 'h-2.5 w-2.5 bg-black/20 hover:bg-black/35'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderGizmos;
