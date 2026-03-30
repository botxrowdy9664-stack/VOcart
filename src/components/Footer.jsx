import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amazon-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-[#37475A] py-4 text-sm font-medium hover:bg-[#485769] transition-colors mb-12 rounded-sm"
        >
          Back to top
        </button>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-700">
          <div>
            <h4 className="font-bold mb-4">Get to Know Us</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="hover:underline cursor-pointer">About Amazon</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect with Us</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Make Money with Us</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell under Amazon Accelerator</li>
              <li className="hover:underline cursor-pointer">Amazon Global Selling</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Let Us Help You</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Amazon App Download</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>

        {/* Logo and Language */}
        <div className="flex flex-col items-center py-12 gap-6">
          <div className="flex items-center">
            <span className="text-2xl font-bold">amazon</span>
            <span className="text-amazon-orange text-xs mt-2 ml-0.5">.in</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <span className="cursor-pointer hover:underline border border-gray-700 px-4 py-1.5 rounded-sm">English</span>
            <span className="cursor-pointer hover:underline border border-gray-700 px-4 py-1.5 rounded-sm">India</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 pt-8 border-t border-gray-800">
          <div className="flex justify-center gap-6 mb-2">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
          </div>
          <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
