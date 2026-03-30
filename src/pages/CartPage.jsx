import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { brandName, brandTitleSuffix } from '../data/branding';
import { formatPrice } from '../utils/currency';

const CartPage = ({ cartItems, onIncrement, onDecrement, onRemove }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [removingUid, setRemovingUid] = React.useState(null);

  const handleRemove = (uid) => {
    setRemovingUid(uid);
    window.setTimeout(() => {
      onRemove(uid);
      setRemovingUid((current) => (current === uid ? null : current));
    }, 360);
  };

  return (
    <>
      <SEOHead
        title={`Your Cart${brandTitleSuffix}`}
        description={`Review the products added to your shopping cart at ${brandName}.`}
      />
      <section className="bg-[#F6F6F3] px-4 py-14 md:px-8 md:py-18">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-orange)]">Cart</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">Shopping Cart</h1>
            </div>
            <Link to="/shop" className="button-soft-hover text-sm font-bold text-gizmos-text transition-colors">
              Continue shopping
            </Link>
          </div>

          {cartItems.length > 0 ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const isMinQuantity = item.quantity <= 1;
                  const isMaxQuantity = item.quantity >= 6;

                  return (
                    <article key={item.uid} className={`night-solid-panel glass-card relative flex min-w-0 items-stretch gap-3 rounded-[24px] p-3 sm:gap-5 sm:rounded-[28px] sm:p-5 ${removingUid === item.uid ? 'cart-item-removing' : ''}`}>
                      <Link to={`/product/${item.slug}`} className="relative h-auto w-[94px] shrink-0 overflow-hidden rounded-[18px] bg-white sm:w-36 sm:rounded-[22px]">
                        <img src={item.img} alt={item.name} className="h-full w-full object-cover object-center" />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-between pr-9 sm:pr-12">
                        <div>
                          <Link
                            to={`/product/${item.slug}`}
                            className="line-clamp-2 text-[0.95rem] font-semibold leading-tight text-gizmos-text transition-colors hover:text-[var(--color-accent-orange)] sm:text-xl"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-[11px] text-gray-500 sm:mt-2 sm:text-sm">{item.category}</p>
                        </div>

                        <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] text-gray-400 sm:text-xs">Price</p>
                            <p className="price-accent mt-0.5 text-[1rem] font-black sm:mt-2 sm:text-lg">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="night-solid-chip glass-chip flex items-center gap-2 self-start rounded-full px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2">
                            <button
                              type="button"
                              onClick={() => onDecrement(item.uid)}
                              disabled={isMinQuantity}
                              className={`flex h-8 w-8 items-center justify-center rounded-full border text-lg transition-colors sm:h-10 sm:w-10 sm:text-xl ${
                                isMinQuantity
                                  ? 'cursor-not-allowed border-gizmos-border text-gray-300'
                                  : 'border-gray-200 text-gizmos-text hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)]'
                              }`}
                            >
                              -
                            </button>
                            <span className="min-w-6 text-center text-[12px] font-bold text-gizmos-text sm:min-w-8 sm:text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onIncrement(item.uid)}
                              disabled={isMaxQuantity}
                              className={`flex h-8 w-8 items-center justify-center rounded-full border text-lg transition-colors sm:h-10 sm:w-10 sm:text-xl ${
                                isMaxQuantity
                                  ? 'cursor-not-allowed border-gizmos-border text-gray-300'
                                  : 'border-gray-200 text-gizmos-text hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)]'
                              }`}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => handleRemove(item.uid)}
                              disabled={removingUid === item.uid}
                              className={`trash-button ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-[var(--color-accent-orange)] hover:text-[var(--color-accent-orange)] sm:h-10 sm:w-10 ${
                                removingUid === item.uid ? 'trash-button-removing opacity-80' : ''
                              }`}
                            >
                              <span className="relative flex h-4 w-4 items-center justify-center sm:h-[18px] sm:w-[18px]">
                                <Trash2 size={16} className="trash-can" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="night-solid-panel glass-panel rounded-[32px] p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gizmos-text">Order Summary</h2>
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <span>Items</span>
                  <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between text-lg font-black text-gizmos-text">
                    <span>Total</span>
                    <span className="price-accent">{formatPrice(subtotal)}</span>
                  </div>
                  <Link
                    to="/login-services-down"
                    className="cta-button-orange mt-6 flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.18em]"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </aside>
            </div>
          ) : (
            <div className="night-solid-panel glass-panel mt-10 rounded-[32px] border-dashed p-12 text-center">
              <p className="text-lg font-semibold text-gizmos-text">Your cart is empty.</p>
              <Link to="/shop" className="cta-button-orange mt-4 inline-flex rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em]">
                Shop products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;
