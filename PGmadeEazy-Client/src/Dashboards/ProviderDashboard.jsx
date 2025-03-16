"use client";

import { useState } from "react";
import { Building, Heart, Search, List, X, Menu, User, LogOut, Settings, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthState';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { user } = state;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [currentView, setCurrentView] = useState("dashboard"); // Current view (dashboard or profile)
  const [properties, setProperties] = useState([]); // Property data (mocked)
  const [loading, setLoading] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    businessName: user.businessName || '',
    location: user.location || '',
  });

  // Stats (mocked for demo purposes)
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
      onClick: () => {
        navigate("/provider-profile"); // Navigates to the profile component
      },
    },
    { icon: Settings, label: "Settings", onClick: () => setCurrentView("settings") },
    { icon: Bell, label: "Notifications", onClick: () => setCurrentView("notifications") },
    { icon: Heart, label: "Saved Properties", onClick: () => setCurrentView("saved-properties") },
    { icon: Search, label: "Search PGs", onClick: () => setCurrentView("search") },
    {
      icon: LogOut,
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        window.location.reload(); // Reload to reset the application state
      },
      className: "text-red-500 hover:bg-red-500/10",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call to save changes here
    console.log('Saving changes...', formData);
    // After saving, you might want to fetch updated user data
  };

  return (
    <div className="flex min-h-screen bg-black/90 backdrop-blur-lg">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-orange-600/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="text-white p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="py-2">
                <button
                  onClick={item.onClick}
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
          {/* Dashboard Content */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Provider Dashboard</h1>
            <button
              onClick={() => alert("Post New Property form here")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              Post New Properties
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-black/80 border border-orange-600 rounded-xl shadow-md shadow-orange-600/20">
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

          {/* Profile Section */}
          {currentView === "profile" && (
            <div className="bg-black/80 p-6 rounded-xl border border-orange-600 shadow-lg shadow-orange-600/20">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded" />
                  </div>
                  <div>
                    <label className="text-gray-400">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded" />
                  </div>
                  <div>
                    <label className="text-gray-400">Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded" />
                  </div>
                  <div>
                    <label className="text-gray-400">Business Name:</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-2 rounded" />
                  </div>
                  <div>
                    <label className="text-gray-400">Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 rounded" />
                  </div>
                </div>
                <button type="submit" className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors">Save Changes</button>
              </form>
            </div>
          )}

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
                  onClick={() => alert("Add new property form here")}
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
                >
                  Post Your First Property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-orange-600 transition-all duration-300">
                    <div className="aspect-video rounded-lg bg-gray-800 mb-4">
                      <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{property.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-medium">₹{property.rent.toLocaleString()}/month</span>
                      <button onClick={() => alert("View details")} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
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

export default ProviderDashboard;
