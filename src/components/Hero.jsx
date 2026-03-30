import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { formatPrice } from '../utils/currency';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-[500px] items-center overflow-hidden bg-[#EBFCFF] px-8 md:px-16 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 py-12 md:grid-cols-2">
        <div ref={textRef} className="z-10 w-full max-w-xl">
          <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#0F1111] md:text-5xl lg:text-6xl">
            SHOP COMPUTERS <br /> & ACCESSORIES
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-[#565959]">
            Shop laptops, desktops, monitors, tablets, PC gaming, hard drives and storage, accessories and more
          </p>
          <button className="rounded-full bg-amazon-orange px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95">
            Shop now
          </button>

          <div className="mt-12 flex w-fit items-center gap-4 rounded-xl border border-white/40 bg-white/50 p-4 shadow-sm backdrop-blur-md">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-white">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2070" alt="Avatar" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Must have for you</p>
              <p className="font-bold text-[#0F1111]">JBL TUNE 760NC Noise Cancelling</p>
              <p className="font-bold text-amazon-orange">{formatPrice(125)} <span className="text-sm font-normal text-gray-400 line-through">{formatPrice(199)}</span></p>
            </div>
          </div>
        </div>

        <div ref={imageRef} className="relative flex items-center justify-center">
          <div className="absolute -z-10 h-[120%] w-[120%] rounded-full bg-white/20 blur-3xl"></div>
          <img
            src="https://images.unsplash.com/photo-1546435770-a3e426ca473b?auto=format&fit=crop&q=80&w=2070"
            alt="Premium Headphones"
            className="w-full max-w-md cursor-pointer transform drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out hover:scale-105"
          />

          <div className="absolute right-10 top-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-amazon-orange text-sm font-bold text-white shadow-xl animate-bounce">
            <span>20%</span>
            <span>OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
