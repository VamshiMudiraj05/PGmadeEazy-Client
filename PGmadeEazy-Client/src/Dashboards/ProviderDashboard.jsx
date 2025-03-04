"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Heart, Search, List, X, Menu, User, LogOut, Settings, Bell } from "lucide-react";
import axios from "axios";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const stats = [
    {
      icon: Building,
      label: "Total Properties",
      value: properties.length,
    },
    {
      icon: Heart,
      label: "Saved Properties",
      value: properties.filter((prop) => prop.saved).length, // Assuming `saved` flag exists
    },
    {
      icon: Search,
      label: "Recent Searches",
      value: properties.filter((prop) => prop.recentlySearched).length, // Assuming `recentlySearched` flag exists
    },
  ];

  // Toggle Sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Menu items for the sidebar
  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      icon: Bell,
      label: "Notifications",
      onClick: () => navigate("/notifications"),
    },
    {
      icon: Heart,
      label: "Saved Properties",
      onClick: () => navigate("/saved-properties"),
    },
    {
      icon: Search,
      label: "Search PGs",
      onClick: () => navigate("/search"),
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/");
      },
      className: "text-red-500 hover:bg-red-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black/90 backdrop-blur-lg">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 rounded-lg bg-black/60 border border-gray-700 hover:border-orange-600 transition-all z-50"
        aria-label="Menu"
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-black/80 z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.5)",
          width: "80%", // Adjust width to cover more space if necessary
        }}
      >
        <div className="flex justify-between items-center p-4">
          
        </div>
        <div className="text-white p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="py-2">
                <button
                  onClick={() => {
                    item.onClick();
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-orange-600/20 transition-colors ${item.className || ""}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-grow ${isSidebarOpen ? "ml-64" : ""} transition-all`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Seeker Dashboard</h1>
            <button
              onClick={() => navigate("/search-properties")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              Search New Properties
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-black/80 border border-orange-600 rounded-xl shadow-md shadow-orange-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-600/20 rounded-lg">
                    <stat.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Properties List */}
          <div className="bg-black/80 border border-orange-600 rounded-xl p-6 shadow-md shadow-orange-600/20">
            <h2 className="text-xl font-bold text-white mb-4">Saved Properties</h2>

            {loading ? (
              <p className="text-gray-400">Loading properties...</p>
            ) : properties.length === 0 ? (
              <div className="text-center py-8">
                <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No saved properties yet</p>
                <button
                  onClick={() => navigate("/search-properties")}
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
                >
                  Start Searching
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.filter((prop) => prop.saved).map((property) => (
                  <div
                    key={property.id}
                    className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-orange-600 transition-all duration-300"
                  >
                    <div className="aspect-video rounded-lg bg-gray-800 mb-4">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{property.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-medium">₹{property.rent.toLocaleString()}/month</span>
                      <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
