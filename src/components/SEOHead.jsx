import { useEffect } from 'react';
import { brandMetaImage, brandName } from '../data/branding';

const setMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const setLinkTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const SEOHead = ({ title, description, keywords, image = brandMetaImage }) => {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const canonicalUrl = window.location.href;
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    document.title = brandName;
    document.documentElement.lang = 'en';

    setMetaTag('meta[name="description"]', { name: 'description', content: description });
    setMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow' });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    setLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      name: brandName,
      url: siteUrl,
      image: imageUrl,
      description,
      priceRange: 'INR',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Credit Card',
      brand: {
        '@type': 'Brand',
        name: brandName,
      },
      makesOffer: ['Smartphones', 'Headphones', 'Laptops', 'Gaming Accessories', 'Wearables'].map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: item,
        },
      })),
    };

    let script = document.head.querySelector('script[data-seo="structured-data"]');

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'structured-data');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);
  }, [description, image, keywords, title]);

  return null;
};

export default SEOHead;
