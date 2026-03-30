import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketingBanners = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-4 py-12 md:px-8" aria-label="Promotional offers">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <article className="night-solid-banner glass-card group relative flex flex-col-reverse items-start justify-between gap-6 overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:flex-row lg:items-center lg:p-10">
          <div className="night-solid-banner-copy glass-chip z-10 rounded-lg p-4">
            <h3 className="mb-2 text-xl font-black text-gizmos-text">Drones & Gadgets</h3>
            <button
              type="button"
              onClick={() => navigate('/shop?search=gadget')}
              className="flex items-center gap-1 text-sm font-black uppercase tracking-widest text-gizmos-text transition-all group-hover:gap-2"
            >
              Shop Now <ChevronRight size={16} />
            </button>
          </div>
          <img
            src="https://i.pinimg.com/1200x/21/10/88/21108826bd4a73e2aff540d0c9d9617e.jpg"
            alt="Drone and smart gadget bundle"
            className="h-48 w-full object-contain transition-transform duration-700 group-hover:scale-110 sm:h-56 lg:w-1/2"
            loading="lazy"
          />
        </article>

        <article className="night-solid-banner glass-card group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-8 md:text-right lg:flex-row lg:items-center lg:p-10">
          <img
            src="https://i.pinimg.com/1200x/31/f0/ee/31f0ee6138a4e2e7a7fc60b83ac2783b.jpg"
            alt="Smartphone and tablet collection"
            className="h-48 w-full object-contain transition-transform duration-700 group-hover:scale-110 sm:h-56 lg:w-1/2 rounded-[30px]"
            loading="lazy"
          />
          <div className="night-solid-banner-copy glass-chip z-10 rounded-lg p-4 md:ml-auto">
            <h3 className="mb-2 text-xl font-black text-gizmos-text">Smartphones & Tablets</h3>
            <button
              type="button"
              onClick={() => navigate('/category/tablets-and-phones')}
              className="ml-auto flex items-center gap-1 text-sm font-black uppercase tracking-widest text-gizmos-text transition-all group-hover:gap-2"
            >
              Shop Now <ChevronRight size={16} />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default MarketingBanners;
