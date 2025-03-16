"use client";

import { useState, useEffect } from "react";
import { Building, Heart, Search, List, X, Menu, User, LogOut, Settings, Bell, Edit, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthState';
import axios from 'axios';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { user } = state;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [currentView, setCurrentView] = useState("welcome"); // Current view (dashboard or profile)
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between display and edit modes
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "",
    currentCity: user.currentCity || "",
    pgName: user.pgName || "",
    pgAddress: user.pgAddress || "",
    availableRooms: user.availableRooms || "",
    hasSingleRooms: user.hasSingleRooms || false,
    hasSharedRooms: user.hasSharedRooms || false,
    rentMin: user.rentMin || "",
    rentMax: user.rentMax || "",
    preferredTenants: user.preferredTenants || "",
    depositAmount: user.depositAmount || "",
    noticePeriod: user.noticePeriod || "",
    houseRules: user.houseRules || [],
    amenities: user.amenities || [],
  });

  // Fetch Provider Data from API
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(`https://pgmadeeazy-server.onrender.com/users/${user.id}`);
        const userData = response.data;
        setFormData(userData); // Update form data with fetched user data
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };
    fetchProviderData();
  }, [user.id]);

  // Toggle Sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkboxes for houseRules and amenities
      const updatedList = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://pgmadeeazy-server.onrender.com/users/${user.id}`, formData);
      alert("Profile updated successfully!");
      setIsEditMode(false); // Switch back to display mode after saving
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Menu items for the sidebar
  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => {
        setCurrentView("profile");
        setIsSidebarOpen(false); // Close sidebar automatically
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
          {currentView === "welcome" && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <h1 className="text-3xl font-bold text-orange-500">
                Welcome, {formData.fullName || "Provider"}! 👋
              </h1>
              <p className="text-lg text-gray-300 mt-2">
                Click on the <span className="text-orange-500 font-semibold">menu</span> for more options.
              </p>
            </div>
          )}

          {/* Profile Content */}
          {currentView === "profile" && (
            <div className="bg-black/80 p-6 rounded-xl border border-orange-600 shadow-lg max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-white">Profile</h1>
                {!isEditMode && (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              <form className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full p-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Current City</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>
                </div>

                {/* Property Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">PG Name</label>
                    <input
                      type="text"
                      name="pgName"
                      value={formData.pgName}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">PG Address</label>
                    <input
                      type="text"
                      name="pgAddress"
                      value={formData.pgAddress}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Available Rooms</label>
                    <input
                      type="text"
                      name="availableRooms"
                      value={formData.availableRooms}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Rent Min</label>
                    <input
                      type="number"
                      name="rentMin"
                      value={formData.rentMin}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Rent Max</label>
                    <input
                      type="number"
                      name="rentMax"
                      value={formData.rentMax}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Tenants</label>
                    <select
                      name="preferredTenants"
                      value={formData.preferredTenants}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    >
                      <option value="">Select...</option>
                      <option value="students">Students</option>
                      <option value="professionals">Professionals</option>
                      <option value="any">Any</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Deposit Amount</label>
                    <input
                      type="number"
                      name="depositAmount"
                      value={formData.depositAmount}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Notice Period</label>
                    <input
                      type="text"
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                    />
                  </div>
                </div>

                {/* House Rules and Amenities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">House Rules</label>
                    <div className="flex flex-wrap gap-2">
                      {["No Smoking", "No Guests", "No Pets", "No Parties"].map((rule) => (
                        <label key={rule} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="houseRules"
                            value={rule}
                            checked={formData.houseRules.includes(rule)}
                            onChange={handleChange}
                            disabled={!isEditMode}
                            className="accent-orange-500"
                          />
                          <span className="text-sm text-gray-400">{rule}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {["Wi-Fi", "AC", "Laundry", "Parking", "Gym"].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={handleChange}
                            disabled={!isEditMode}
                            className="accent-orange-500"
                          />
                          <span className="text-sm text-gray-400">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save Changes Button */}
                {isEditMode && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSaveChanges}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors text-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;