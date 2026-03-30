import React from 'react';
import SEOHead from '../components/SEOHead';
import { brandName, brandTitleSuffix } from '../data/branding';

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title={`About Us${brandTitleSuffix}`}
        description={`Learn more about ${brandName}, our store, support values, reliability promise, and customer-first shopping experience.`}
      />
      <section className="bg-[#EEEDE8] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-orange)]">About</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">About {brandName}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-gray-500">
            {brandName} ek modern electronics storefront hai jahan hum curated gadgets, reliable shopping flows,
            aur better browsing experience par focus karte hain. Product discovery se checkout tak har part ko clean,
            fast aur easy rakhna hi hamara main goal hai.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Our Store',
              text: 'Trending gadgets, accessories, wearables aur smart electronics ko ek hi jagah thoughtfully organize kiya gaya hai.',
            },
            {
              title: 'Safety & Reliability',
              text: 'Clear browsing, transparent product details, aur dependable support touchpoints ke through trust build karna hamari priority hai.',
            },
            {
              title: 'Customer Care',
              text: 'Account help, store guidance, FAQs aur general support style content ko ek simple destination me laaya gaya hai.',
            },
          ].map((item) => (
            <article key={item.title} className="glass-card rounded-[28px] p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gizmos-text">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-500">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutPage;
