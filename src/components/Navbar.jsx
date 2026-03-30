import React from 'react';
import { Search, ShoppingCart, MapPin, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-amazon-dark text-white text-sm font-medium">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 gap-4">
        {/* Logo */}
        <div className="flex items-center px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
          <span className="text-2xl font-bold tracking-tight">amazon</span>
          <span className="text-amazon-orange text-xs mt-2 ml-0.5">.in</span>
        </div>

        {/* Address */}
        <div className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
          <span className="text-gray-400 text-xs font-normal ml-5">Delivering to Mumbai 400001</span>
          <div className="flex items-center">
            <MapPin size={18} className="mr-1" />
            <span className="font-bold">Update location</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center h-10 px-2 group">
          <div className="flex w-full">
            <select className="bg-gray-100 text-gray-700 px-3 rounded-l-md border-r border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-amazon-orange">
              <option>All</option>
            </select>
            <input 
              type="text" 
              placeholder="Search Amazon.in" 
              className="w-full px-4 text-black outline-none h-10 focus:ring-2 focus:ring-amazon-orange"
            />
            <button className="bg-amazon-orange px-4 py-2 rounded-r-md hover:bg-[#F3A847] transition-colors">
              <Search size={24} color="#333" />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
            <span className="text-xs font-normal">Hello, sign in</span>
            <span className="font-bold">Account & Lists</span>
          </div>
          <div className="hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
            <span className="text-xs font-normal">Returns</span>
            <span className="font-bold">& Orders</span>
          </div>
          <div className="flex items-center px-2 py-2 border border-transparent hover:border-white transition-all cursor-pointer relative">
            <ShoppingCart size={32} />
            <span className="absolute top-1 right-5 bg-amazon-orange text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs ring-2 ring-amazon-dark">0</span>
            <span className="font-bold self-end mb-1 ml-1">Cart</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amazon-light flex items-center px-4 py-1 gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
          <Menu size={20} />
          <span className="font-bold">All</span>
        </div>
        {["Fresh", "Amazon miniTV", "Sell", "Gift Cards", "Amazon Pay", "Buy Again", "Gift Ideas", "Health, Household & Personal Care"].map((item) => (
          <span key={item} className="px-2 py-1 border border-transparent hover:border-white transition-all cursor-pointer">
            {item}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
