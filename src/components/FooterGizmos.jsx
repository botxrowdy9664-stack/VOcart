import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandIdentity from './BrandIdentity';
import { brandName } from '../data/branding';
import { formatPrice } from '../utils/currency';

const footerGroups = [
  {
    title: 'Privacy Policy',
    items: [
      { label: 'Returns & Exchanges', to: '/about' },
      { label: 'Payment Terms', to: '/about' },
      { label: 'Delivery Terms', to: '/about' },
      { label: 'Payment Methods', to: '/about' },
      { label: 'Terms Of Use', to: '/about' },
    ],
  },
  {
    title: 'Get Involved',
    items: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Store', to: '/shop' },
      { label: 'Safety & Reliability', to: '/about' },
      { label: 'Office Systems', to: '/about' },
      { label: 'Contact Us', to: '/about' },
    ],
  },
  {
    title: 'Quick Links',
    items: [
      { label: 'Smartphones', to: '/category/tablets-and-phones' },
      { label: 'Headphones', to: '/category/headphones' },
      { label: 'Laptops & Tablets', to: '/shop?search=laptop' },
      { label: 'Monitors', to: '/about' },
      { label: 'Gadgets', to: '/shop' },
    ],
  },
  {
    title: 'Customer Care',
    items: [
      { label: 'My Account', to: '/about' },
      { label: 'Store Locator', to: '/about' },
      { label: 'Customer Service', to: '/about' },
      { label: 'Return Exchange', to: '/about' },
      { label: 'FAQs', to: '/about' },
    ],
  },
];

const FooterGizmos = () => {
  return (
    <footer className="bg-[#111111] pt-20 text-white" id="contact">
      <div className="border-b border-white/10 px-4 py-14 text-white md:px-8 md:py-16">
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="mb-2 text-3xl font-black uppercase tracking-tighter">Sign up to Newsletter</h2>
            <p className="font-medium text-white/65">
              Join 60.000+ subscribers and get a new discount coupon every Saturday.
            </p>
          </div>

          <div className="relative w-full max-w-2xl flex-1">
            <div className="flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/[0.06] p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full">
              <input
                type="email"
                placeholder="Your Email Address"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 font-medium text-white outline-none sm:px-8"
              />
              <button className="cta-button-orange rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest transition-all sm:px-12">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden text-xs font-black uppercase tracking-widest xl:block">Follow us on:</span>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white hover:text-black"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 py-20">
        <div className="container mx-auto grid grid-cols-2 gap-12 px-4 text-sm md:grid-cols-4 md:px-8">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-8 font-black uppercase tracking-widest text-white">{group.title}</h4>
              <ul className="flex flex-col gap-4 font-bold text-white/70">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="transition-colors hover:text-[var(--color-accent-orange)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] px-4 py-12 md:px-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <BrandIdentity
              className="transition-transform hover:scale-[1.02]"
              logoClassName="h-10 w-10 sm:h-11 sm:w-11"
              textSizeClassName="text-[1.9rem] sm:text-[2rem]"
            />

            <div className="flex flex-col items-center gap-3 text-center text-sm font-bold text-white/60 sm:flex-row sm:gap-8">
              <span>+0(800) 1234 56 789</span>
              <span className="hidden sm:block">Orders above {formatPrice(100)}</span>
              <span className="hidden sm:block">Save up to 20%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white/45">
            <CreditCard size={32} />
            <ShieldCheck size={32} />
            <HelpCircle size={32} />
            <div className="h-8 w-12 rounded bg-white/20" />
            <div className="h-8 w-12 rounded bg-white/20" />
          </div>
        </div>

        <div className="container mx-auto mt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            Copyright 2026 VOcart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterGizmos;

