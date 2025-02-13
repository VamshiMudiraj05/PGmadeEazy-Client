import { Search } from "lucide-react";
import 'react';

export default function Hero() {
  return (
    <section className="bg-black/90 backdrop-blur-lg px-4 py-20">
      <div className="container mx-auto flex flex-col items-center text-center gap-6">
        
        {/* Hero Title */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Perfect <span className="text-orange-500">PG Accommodation</span>
        </h1>
        
        {/* Hero Subtitle */}
        <p className="max-w-2xl text-lg text-gray-400">
          Discover comfortable and affordable PG accommodations in your preferred location. Verified listings, instant
          booking, and hassle-free stay.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          
          {/* Search PGs Button */}
          <button className="flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-black font-medium shadow-md shadow-orange-600/30 transition-all duration-300 hover:bg-orange-600 hover:scale-105 active:scale-95">
            <Search className="h-5 w-5" />
            Search PGs
          </button>

          {/* List Your Property Button */}
          <button className="rounded-md border border-orange-500 px-6 py-3 text-orange-500 font-medium transition-all duration-300 hover:bg-orange-600 hover:text-black hover:scale-105 active:scale-95">
            List Your Property
          </button>
        
        </div>
      </div>
    </section>
  );
}
