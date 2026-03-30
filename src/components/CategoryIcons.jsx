import React from 'react';
import { Camera, Gamepad2, Smartphone, Tablet, Tv, Headphones, Watch, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryDefinitions } from '../data/catalog';

const categories = [
  { icon: Camera, name: 'Cameras' },
  { icon: Gamepad2, name: 'Video Games' },
  { icon: Tablet, name: 'Tablets & Phones' },
  { icon: Smartphone, name: 'Accessories' },
  { icon: Tv, name: 'TV & Audio' },
  { icon: Headphones, name: 'Headphones' },
  { icon: Watch, name: 'Watches' },
  { icon: Laptop, name: 'Laptops' },
];

const CategoryIcons = () => {
  return (
    <section className="border-b border-gizmos-border bg-white py-12" aria-labelledby="category-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 text-center">
          <h2 id="category-heading" className="text-3xl font-black uppercase tracking-tight text-gizmos-text sm:text-4xl">
            Shop popular categories
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Browse trending gadget categories optimized for quick discovery on every screen size.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-8">
          {categories.map((category) => {
            const match = categoryDefinitions.find((item) => item.name === category.name);

            return (
              <Link
                key={category.name}
                to={`/category/${match?.slug ?? ''}`}
                className="group flex flex-col items-center rounded-2xl p-3 text-center transition-colors"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gizmos-yellow text-gizmos-text shadow-sm transition-all duration-300 group-hover:bg-[var(--color-accent-orange)] group-hover:text-white group-hover:shadow-lg">
                  <category.icon size={32} strokeWidth={1.5} />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-tighter text-gray-800 transition-colors group-hover:text-[var(--color-accent-orange)]">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
