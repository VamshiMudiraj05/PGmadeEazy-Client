import { NavLink } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-600 bg-black/90 backdrop-blur-lg shadow-md shadow-orange-600/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo Section with Animation */}
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-orange-500 animate-pulse hover:animate-spin" />
          <NavLink
            to="/"
            className="text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 hover:scale-105 transform"
          >
            PG Made Eazy
          </NavLink>
        </div>

        {/* Navigation Links with Hover Animations */}
        <nav className="hidden md:flex items-center gap-8">
          {["Find PG", "List Property", "How it Works", "Contact"].map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `text-base font-medium transition-all duration-300 relative 
                 ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-300 hover:text-orange-500 hover:scale-105 transform"}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons with Hover and Click Animations */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-all duration-300 
              ${isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500 hover:scale-105 transform"}`
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to="/get-started"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-md 
              ${isActive ? "bg-orange-600 text-black shadow-orange-600/30" : "bg-orange-500 text-black hover:bg-orange-600 hover:scale-105 transform active:scale-95"}`
            }
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}