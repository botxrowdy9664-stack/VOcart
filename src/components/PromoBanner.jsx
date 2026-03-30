import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const PromoBanner = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative">
        <div className="z-10 max-w-lg">
          <span className="text-amazon-orange font-bold text-sm tracking-widest uppercase mb-2 block">Special Delivery</span>
          <h2 className="text-4xl font-extrabold text-[#0F1111] mb-6">AMAZON DELIVERS <br /> TO YOU</h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            Fast, free delivery on millions of items. Shop now and experience the best of Amazon.
          </p>
          <button className="bg-amazon-dark text-white px-10 py-3 rounded-md font-bold hover:bg-[#37475A] transition-all active:scale-95 shadow-lg">
            View more
          </button>
        </div>
        
        <MotionDiv 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative"
        >
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amazon-orange/10 rounded-full blur-3xl -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1549460032-650a3ec60515?auto=format&fit=crop&q=80&w=1770" 
            alt="Delivery Packaging" 
            className="w-full max-w-md rounded-xl shadow-2xl skew-y-2 transform transition-transform hover:skew-y-0 duration-500"
          />
        </MotionDiv>
      </div>
    </section>
  );
};

export default PromoBanner;
