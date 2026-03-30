import React from 'react';
import HeroSliderGizmos from '../components/HeroSliderGizmos';
import CategoryIcons from '../components/CategoryIcons';
import MarketingBanners from '../components/MarketingBanners';
import ProductTabsGizmos from '../components/ProductTabsGizmos';
import LargeHeroBanner from '../components/LargeHeroBanner';
import RecentlyAdded from '../components/RecentlyAdded';
import ComponentLabel from '../utils/ComponentLabel';
import SEOHead from '../components/SEOHead';
import { brandHomeTitle, brandName } from '../data/branding';

const HomePage = ({ onAddToCart, onToggleCart, wishlistItems, onToggleWishlist, cartItemIds }) => {
  return (
    <>
      <SEOHead
        title={brandHomeTitle}
        description={`Shop smartphones, laptops, headphones, gaming accessories, and premium electronics with ${brandName}'s fast, responsive storefront built for modern discovery.`}
        keywords="electronics store, gadgets shop, buy headphones, buy laptops, gaming accessories, smartphones online"
      />
      <main id="main-content">
        <ComponentLabel name="Hero Slider">
          <HeroSliderGizmos />
        </ComponentLabel>
        <ComponentLabel name="Category Grid">
          <CategoryIcons />
        </ComponentLabel>
        <ComponentLabel name="Marketing Banners">
          <MarketingBanners />
        </ComponentLabel>
        <ComponentLabel name="Featured Products Tabs">
          <ProductTabsGizmos
            title="Featured Products"
            variant="featured"
            onAddToCart={onAddToCart}
            onToggleCart={onToggleCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={onToggleWishlist}
            cartItemIds={cartItemIds}
          />
        </ComponentLabel>
        <ComponentLabel name="Promo Large Banner">
          <LargeHeroBanner />
        </ComponentLabel>
        <ComponentLabel name="Top Rated Tabs">
          <ProductTabsGizmos
            title="Top Rated Products"
            variant="standard"
            onAddToCart={onAddToCart}
            onToggleCart={onToggleCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={onToggleWishlist}
            cartItemIds={cartItemIds}
          />
        </ComponentLabel>
        <ComponentLabel name="Recently Added & Features">
          <RecentlyAdded
            onAddToCart={onAddToCart}
            onToggleCart={onToggleCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={onToggleWishlist}
            cartItemIds={cartItemIds}
          />
        </ComponentLabel>
      </main>
    </>
  );
};

export default HomePage;
