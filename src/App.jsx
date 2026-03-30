import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import HeaderGizmos from './components/HeaderGizmos';
import FooterGizmos from './components/FooterGizmos';
import PosterShowcase from './components/PosterShowcase';
import ComponentLabel from './utils/ComponentLabel';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
import LoginDownPage from './pages/LoginDownPage';
import AboutPage from './pages/AboutPage';

const CART_STORAGE_KEY = 'worldwide-gizmos-cart';
const WISHLIST_STORAGE_KEY = 'worldwide-gizmos-wishlist';
const MIN_CART_QUANTITY = 1;
const MAX_CART_QUANTITY = 6;

const normalizeCartItems = (items = []) =>
  items.map((item) => ({
    ...item,
    quantity: Math.min(MAX_CART_QUANTITY, Math.max(MIN_CART_QUANTITY, Number(item.quantity) || MIN_CART_QUANTITY)),
  }));

function App() {
  const [cartItems, setCartItems] = React.useState(() => {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? normalizeCartItems(JSON.parse(savedCart)) : [];
  });
  const [wishlistItems, setWishlistItems] = React.useState(() => {
    const savedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  React.useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  React.useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  React.useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    window.localStorage.removeItem('worldwide-gizmos-theme');
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.uid === product.uid);

      if (existingItem) {
        return currentItems;
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const handleToggleCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.uid === product.uid);

      if (existingItem) {
        return currentItems.filter((item) => item.uid !== product.uid);
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some((item) => item.uid === product.uid);

      if (exists) {
        return currentItems.filter((item) => item.uid !== product.uid);
      }

      return [...currentItems, product];
    });
  };

  const updateQuantity = (uid, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.uid === uid
          ? {
              ...item,
              quantity: Math.min(MAX_CART_QUANTITY, Math.max(MIN_CART_QUANTITY, item.quantity + change)),
            }
          : item,
      ),
    );
  };

  const removeCartItem = (uid) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.uid !== uid));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartItemIds = cartItems.map((item) => item.uid);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white selection:bg-[var(--color-accent-orange)] selection:text-white">
        <ComponentLabel name="Header & Navigation">
          <HeaderGizmos cartCount={cartCount} wishlistCount={wishlistItems.length} />
        </ComponentLabel>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onToggleCart={handleToggleCart}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                cartItemIds={cartItemIds}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={handleAddToCart}
                onToggleCart={handleToggleCart}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                cartItemIds={cartItemIds}
              />
            }
          />
          <Route
            path="/category/:categorySlug"
            element={
              <CategoryPage
                onAddToCart={handleAddToCart}
                onToggleCart={handleToggleCart}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                cartItemIds={cartItemIds}
              />
            }
          />
          <Route
            path="/product/:productSlug"
            element={
              <ProductPage
                onAddToCart={handleAddToCart}
                onToggleCart={handleToggleCart}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                cartItemIds={cartItemIds}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistItems={wishlistItems}
                onAddToCart={handleAddToCart}
                onToggleCart={handleToggleCart}
                onToggleWishlist={handleToggleWishlist}
                cartItemIds={cartItemIds}
              />
            }
          />
          <Route path="/login-services-down" element={<LoginDownPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onIncrement={(uid) => updateQuantity(uid, 1)}
                onDecrement={(uid) => updateQuantity(uid, -1)}
                onRemove={removeCartItem}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ComponentLabel name="Poster Showcase">
          <PosterShowcase />
        </ComponentLabel>
        <ComponentLabel name="Main Footer">
          <FooterGizmos />
        </ComponentLabel>
      </div>
    </SmoothScroll>
  );
}

export default App;

