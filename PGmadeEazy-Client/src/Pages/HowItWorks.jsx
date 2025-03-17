import { Building, Heart, Search } from "lucide-react";
import React from 'react';

export default function HowItWorks() {
  return (
    <section className="bg-black/90 backdrop-blur-lg px-4 py-20">
      <div className="container mx-auto flex flex-col items-center text-center gap-6">
        
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          How <span className="text-orange-500">PG Made Eazy</span> Works
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-gray-400">
          Discover how easy it is to find or list PG accommodations. Our platform connects seekers and providers with
          a seamless experience.
        </p>

        {/* Step 1 */}
        <div className="flex flex-col sm:flex-row gap-8 mt-12">
          <div className="flex flex-col items-center max-w-xs">
            <Building className="h-16 w-16 text-orange-500" />
            <h2 className="text-2xl font-semibold text-white mt-4">Step 1: Search for PGs</h2>
            <p className="text-gray-400 mt-2">
              Use filters to search for PGs based on location, price, room types, and amenities.
            </p>
          </div>
          
          <div className="flex flex-col items-center max-w-xs">
            <Heart className="h-16 w-16 text-orange-500" />
            <h2 className="text-2xl font-semibold text-white mt-4">Step 2: Save Your Favorite Properties</h2>
            <p className="text-gray-400 mt-2">
              Save properties you like to review them later or share with friends.
            </p>
          </div>
          
          <div className="flex flex-col items-center max-w-xs">
            <Search className="h-16 w-16 text-orange-500" />
            <h2 className="text-2xl font-semibold text-white mt-4">Step 3: Book Your PG</h2>
            <p className="text-gray-400 mt-2">
              Book your favorite PG with instant confirmation and start your stay.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
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
