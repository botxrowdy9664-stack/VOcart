import React from 'react';
import posterJbl from '../assets/poster-jbl.jpg';
import posterIphone from '../assets/poster-iphone.jpg';

const posters = [
  {
    id: 'jbl',
    image: posterJbl,
    alt: 'JBL earbuds promotional poster',
  },
  {
    id: 'iphone',
    image: posterIphone,
    alt: 'iPhone 17 Pro promotional poster',
  },
];

const PosterShowcase = () => {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-16" aria-labelledby="poster-showcase-heading">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gizmos-blue">Spotlight Posters</p>
          <h2 id="poster-showcase-heading" className="text-3xl font-black tracking-tight text-gizmos-text sm:text-4xl">
            Featured Visual Drops
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {posters.map((poster) => (
            <article
              key={poster.id}
              className="overflow-hidden rounded-[28px] border border-gizmos-border bg-gizmos-yellow shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
            >
              <img src={poster.image} alt={poster.alt} className="h-full w-full object-cover object-center" loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PosterShowcase;
