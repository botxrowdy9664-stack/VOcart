import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { brandName, brandTitleSuffix } from '../data/branding';

const LoginDownPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title={`Login Unavailable${brandTitleSuffix}`}
        description={`Login services are temporarily unavailable at ${brandName}.`}
      />
      <section className="bg-[#F6F6F3] px-4 py-20 md:px-8 md:py-24">
        <div className="container mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cta-button-neutral mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em]"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="glass-panel rounded-[36px] p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-500">
              <AlertTriangle size={30} />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-gizmos-text sm:text-5xl">Oops</h1>
            <p className="mt-4 text-lg font-semibold text-gizmos-text">These services are temporarily down.</p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-gray-500">
              Login aur comment services abhi temporarily unavailable hain. Thoda der baad dobara try karein.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/shop" className="cta-button-orange rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors">
                Continue Shopping
              </Link>
              <Link to="/" className="cta-button-neutral rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em]">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginDownPage;
