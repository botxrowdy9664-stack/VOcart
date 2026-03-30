import { allProductDetails, featuredProducts, topRatedProducts, recentlyAddedProducts } from './products/productStore.js';

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const sourceMaps = [
  { source: 'featured', groups: featuredProducts },
  { source: 'top-rated', groups: topRatedProducts },
  { source: 'recent', groups: { Recent: recentlyAddedProducts } },
];

const sourceIndex = new Map();

sourceMaps.forEach(({ source, groups }) => {
  Object.values(groups).forEach((products) => {
    products.forEach((product) => {
      if (!sourceIndex.has(product.id)) {
        sourceIndex.set(product.id, new Set());
      }

      sourceIndex.get(product.id).add(source);
    });
  });
});

export const allProducts = allProductDetails.map((product, index) => {
  const sources = Array.from(sourceIndex.get(product.id) ?? []);
  const sourceBonus = sources.includes('top-rated') ? 0.3 : sources.includes('recent') ? 0.1 : sources.includes('featured') ? 0.2 : 0;
  const generatedRating = Math.min(5, 4 + sourceBonus + (product.tags?.length ?? 0) * 0.08);
  const rating = Number((product.rating ?? generatedRating).toFixed(1));
  const reviewCount = Math.max(
    24,
    Math.round((product.price ?? 0) * 4 + (product.tags?.length ?? 0) * 35 + index * 29 + sourceBonus * 100),
  );
  const popularityScore = Math.round(reviewCount + rating * 100 + (sources.includes('featured') ? 150 : 0));

  return {
    ...product,
    uid: product.id,
    slug: `${slugify(product.name)}-${String(product.id).toLowerCase()}`,
    sources,
    price: Number(product.price),
    tags: product.tags ?? [],
    delivery: product.delivery ?? 'Fast delivery available',
    rating,
    reviewCount,
    popularityScore,
    description:
      product.description ??
      'A reliable gadget built for everyday performance, entertainment, and convenience.',
  };
});

export const categoryDefinitions = [
  {
    name: 'Cameras',
    slug: 'cameras',
    categories: ['Camera'],
    terms: ['camera', 'webcam', 'hero-8', 'vlogging', 'photography', 'cctv'],
  },
  {
    name: 'Video Games',
    slug: 'video-games',
    categories: ['Video Games'],
    terms: ['gaming', 'console', 'video game'],
  },
  {
    name: 'Tablets & Phones',
    slug: 'tablets-and-phones',
    categories: ['Tablets & Phones'],
    terms: ['tablet', 'phone', 'smartphone', 'charger', 'power bank', 'adapter'],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    categories: ['Accessories'],
    terms: ['accessories', 'adapter', 'stand', 'cable', 'case', 'keyboard', 'mouse', 'cooling pad', 'organizer'],
  },
  {
    name: 'TV & Audio',
    slug: 'tv-and-audio',
    categories: ['TV'],
    terms: ['audio', 'speaker', 'tv', 'soundbar'],
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    categories: ['Headphones'],
    terms: ['headphone', 'earphone', 'earbud', 'buds', 'pods'],
  },
  {
    name: 'Watches',
    slug: 'watches',
    categories: ['Watches'],
    terms: ['watch'],
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    categories: ['Laptops'],
    terms: ['laptop'],
  },
];

export const getProductsForCategory = (categorySlug) => {
  const category = categoryDefinitions.find((item) => item.slug === categorySlug);

  if (!category) {
    return [];
  }

  return allProducts.filter((product) => {
    const normalizedCategory = product.category?.toLowerCase();
    const hasExplicitCategories = (category.categories ?? []).length > 0;

    if (hasExplicitCategories) {
      return category.categories.some((item) => item.toLowerCase() === normalizedCategory);
    }

    const haystack = [
      product.name,
      product.category,
      product.description,
      ...(product.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return (category.terms ?? []).some((term) => haystack.includes(term));
  });
};

export const getCategoryPriceBounds = (categorySlug) => {
  const prices = getProductsForCategory(categorySlug).map((product) => product.price);

  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const findProductBySlug = (slug) =>
  allProducts.find((product) => product.slug === slug);

export const searchProducts = (query) => {
  const term = query.trim().toLowerCase();

  if (!term) {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.description,
      ...(product.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(term);
  });
};





