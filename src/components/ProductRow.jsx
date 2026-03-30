import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { formatPrice } from '../utils/currency';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: 'Amazon Basics Lightning to USB Cable', price: 15.99, rating: 4.5, reviews: '23,450', img: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&q=80&w=1898' },
  { id: 2, name: 'Super UHD Cinema TV 4K HDR Smart TV', price: 129.97, rating: 4.8, reviews: '12,980', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=2070' },
  { id: 3, name: 'Instant Pot Duo Plus 9-in-1 Electric Cooker', price: 79.0, rating: 4.7, reviews: '45,210', img: 'https://images.unsplash.com/photo-1588725835017-fdf099684179?auto=format&fit=crop&q=80&w=1771' },
  { id: 4, name: 'Philips Hair Dryer with 1800W Power', price: 24.99, rating: 4.6, reviews: '8,920', img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=1974' },
  { id: 5, name: 'Prestige Non-Stick Frying Pan with Lids', price: 59.94, rating: 4.4, reviews: '5,430', img: 'https://images.unsplash.com/photo-1584285114757-01004126bafe?auto=format&fit=crop&q=80&w=1964' },
];

const ProductRow = ({ title }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rowRef} className="bg-white px-4 py-12 md:px-8">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#0F1111]">{title}</h2>
          <a href="#" className="text-sm font-medium text-amazon-link hover:underline">View more</a>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <div key={product.id} className="product-card flex cursor-pointer flex-col group">
              <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4 transition-all group-hover:shadow-lg">
                <img src={product.img} alt={product.name} className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute left-2 top-2 rounded-sm bg-[#CC0C39] px-2 py-0.5 text-[10px] font-bold text-white">Hot Deal</div>
              </div>
              <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-[#0F1111] transition-colors group-hover:text-amazon-link">
                {product.name}
              </h3>
              <div className="mb-1 flex items-center gap-1">
                <div className="flex text-amazon-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={1} />
                  ))}
                </div>
                <span className="text-xs text-amazon-link">{product.reviews}</span>
              </div>
              <div className="mt-auto flex items-baseline gap-1 text-xl font-bold text-[#0F1111]">
                <span>{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
