import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Newsletter = () => {
  return (
    <section className="bg-[#FAE9E9] py-20 px-4 md:px-8">
      <div className="container mx-auto flex flex-col items-center text-center max-w-4xl">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amazon-orange font-bold uppercase tracking-widest text-sm mb-4 block">Newsletter</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F1111] mb-6 leading-tight">
            SUBSCRIBE TO THE <br /> NEWS
          </h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto">
            Get early access to our seasonal sales, exclusive deals, and the latest product launches. No spam, just the good stuff.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full border-none outline-none shadow-md focus:ring-2 focus:ring-amazon-orange text-black"
            />
            <button className="bg-amazon-dark text-white px-10 py-4 rounded-full font-bold hover:bg-[#37475A] transition-all shadow-xl active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </MotionDiv>
        
        {/* Floating elements for visual flair */}
        <div className="absolute left-[10%] top-[40%] hidden lg:block opacity-20">
          <img src="https://images.unsplash.com/photo-1549460032-650a3ec60515?auto=format&fit=crop&q=80&w=1770" alt="Box" className="w-24 rotate-12" />
        </div>
        <div className="absolute right-[10%] bottom-[20%] hidden lg:block opacity-20">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2070" alt="Headphones" className="w-32 -rotate-12" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
