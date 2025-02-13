import { Search, Shield, UserCircle2 } from "lucide-react";
import 'react';

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find PGs based on location, price, amenities, and more with our advanced search filters.",
  },
  {
    icon: UserCircle2,
    title: "Verified Hosts",
    description: "All our PG owners are verified to ensure a safe and reliable booking experience.",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Book your PG with confidence using our secure payment system and booking protection.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-black/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Key Features</h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to find or list PG accommodations, all in one platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-xl border border-orange-600 bg-black/80 shadow-md shadow-orange-600/20 transition-transform duration-300 hover:scale-105"
            >
              <feature.icon className="h-12 w-12 text-orange-500 mb-4 animate-pulse hover:animate-spin transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
