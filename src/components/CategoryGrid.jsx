import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const categories = [
  {
    title: "Beauty picks",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1780",
    link: "Shop now",
  },
  {
    title: "Computer & Accessories",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=2071",
    link: "Shop now",
  },
  {
    title: "Video games",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=1712",
    link: "Shop now",
  },
  {
    title: "Toys & Games",
    image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=1770",
    link: "Shop now",
  },
];

const CategoryGrid = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <MotionDiv
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 shadow-md rounded-lg flex flex-col group cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-4 text-[#0F1111]">{category.title}</h3>
            <div className="relative overflow-hidden aspect-square mb-6 bg-gray-50 flex items-center justify-center">
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <a href="#" className="text-amazon-link text-sm font-medium hover:text-[#C7511F] hover:underline">
              {category.link}
            </a>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
