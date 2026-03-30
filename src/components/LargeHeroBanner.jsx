import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatPrice } from '../utils/currency';

gsap.registerPlugin(ScrollTrigger);

const LargeHeroBanner = () => {
  const bannerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        scale: 1.2,
        y: 100,
        rotate: -5,
        ease: 'none',
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="promo-banner-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="night-solid-banner glass-panel relative flex flex-col items-center justify-between overflow-hidden rounded-[32px] p-6 sm:rounded-[40px] sm:p-10 md:flex-row md:p-16 lg:rounded-[60px] lg:p-24">
          <div className="z-10 max-w-xl text-center md:text-left">
            <h2
              id="promo-banner-heading"
              className="mb-6 text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-gizmos-text drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] sm:text-5xl lg:mb-8 lg:text-8xl"
            >
              Connecting <br /> <span className="text-[var(--color-accent-orange)] drop-shadow-[0_0_20px_var(--color-header-glass-shine)]">Easier</span> <br /> than ever
            </h2>
            <p className="mb-8 text-xs font-black uppercase tracking-[0.25em] text-gizmos-text sm:mb-12 sm:border-l-4 sm:border-black/15 sm:pl-4 sm:text-sm">
              Premium Gaming Series | Z87-GD65
            </p>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <span className="hero-starting-label ml-1 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                Starting from
              </span>
              <div className="relative">
                <span className="hero-starting-price text-5xl font-black tracking-tighter text-gizmos-text sm:text-6xl lg:text-7xl">
                  {formatPrice(970)}
                </span>
                <div className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-[var(--color-accent-orange)]" />
              </div>
            </div>
          </div>

          <div className="group relative mt-10 w-full max-w-xl perspective-[1000px] md:mt-0">
            <div className="absolute -inset-10 -z-10 rounded-full bg-white/50 blur-[100px] transition-all duration-700 group-hover:bg-white/70" />
            <img
              ref={imageRef}
              src="https://i.pinimg.com/1200x/d1/5c/1a/d15c1a96acdbaa44b81258c93152280b.jpg?auto=format&fit=crop&q=80&w=2070"
              alt="Premium orange wireless headphones"
              className="w-full max-w-2xl transform drop-shadow-2xl transition-transform duration-700 rounded-[10px]"
              loading="lazy"
            />
          </div>

          <div className="absolute right-6 top-6 hidden h-20 w-20 rounded-full border-8 border-white/50 md:block lg:h-24 lg:w-24" />
          <div className="absolute bottom-6 left-6 hidden h-32 w-32 rounded-full border-[16px] border-gizmos-blue/15 lg:block lg:h-48 lg:w-48 lg:border-[20px]" />
        </div>
      </div>
    </section>
  );
};

export default LargeHeroBanner;
