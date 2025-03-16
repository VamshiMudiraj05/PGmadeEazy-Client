import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, Settings, Bell, Heart, Building, Search } from "lucide-react"; // Ensure all icons are imported correctly
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from './auth'; // Import useAuth hook

const HamburgerMenu = ({ userType }) => {
  const { state } = useAuth();
  console.log('Auth State:', state);
  console.log('User Type:', userType);

  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Menu items based on user type
  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => {
        console.log("Profile clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        console.log("Settings clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    },
    {
      icon: Bell,
      label: "Notifications",
      onClick: () => {
        console.log("Notifications clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    },
  ];

  // Add user type specific menu items
  if (userType === "seeker") {
    menuItems.push({
      icon: Heart,
      label: "Saved Properties",
      onClick: () => {
        console.log("Saved Properties clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    });
    menuItems.push({
      icon: Search,
      label: "Search PGs",
      onClick: () => {
        console.log("Search PGs clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    });
  } else if (userType === "provider") {
    menuItems.push({
      icon: Building,
      label: "My Properties",
      onClick: () => {
        console.log("My Properties clicked - No navigation");
        setIsOpen(false); // Close the menu
      },
    });
  }

  // Add logout at the end
  menuItems.push({
    icon: LogOut,
    label: "Logout",
    onClick: handleLogout,
    className: "text-red-500 hover:bg-red-500/10",
  });

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-black/60 border border-gray-700 hover:border-orange-600 transition-all"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-black/95 border border-orange-600 shadow-lg shadow-orange-600/20 z-50 overflow-hidden">
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-orange-600/20 transition-colors ${item.className || ""}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
