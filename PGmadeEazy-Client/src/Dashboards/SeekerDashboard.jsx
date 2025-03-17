import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Settings, Bell, Edit, Save } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("welcome");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    currentCity: "",
    preferredLocation: "",
    occupationType: "",
    collegeName: "",
    courseName: "",
    yearOfStudy: "",
    collegeAddress: "",
    budgetMin: "",
    budgetMax: "",
    roomType: "",
    genderPreference: "",
    foodPreference: "",
    amenities: [],
  });
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between display and edit modes

  // Fetch User Data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found. Please log in again.");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`);

        setUserData(response.data);
        setFormData(response.data); // Keep original data for editing
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle Save Changes
  const handleSaveChanges = async (event) => {
    event.preventDefault()
    try {
      // console.log(`${import.meta.env.VITE_API_BASE_URL}/users/${formData.id}`)
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${formData.id}`, formData);

      setUserData(formData);
      alert("Profile updated successfully!");
      setIsEditMode(false); // Switch back to display mode after saving
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkboxes for amenities
      const updatedAmenities = checked
        ? [...formData.amenities, value]
        : formData.amenities.filter((item) => item !== value);
      setFormData({ ...formData, amenities: updatedAmenities });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Sidebar Menu Items
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
    { icon: LogOut, label: "Logout", onClick: () => navigate("/") },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="fixed top-16 left-4 p-2 rounded-lg bg-black/60 border border-gray-700 hover:border-orange-600 transition-all z-50"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

{/* Main Content */}
<main className="flex-1 container mx-auto p-6 pt-20">
        {currentView === "welcome" && userData && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h1 className="text-3xl font-bold text-orange-500">
              Hello, {userData.fullName || "User"}! 👋
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              Click on the <span className="text-orange-500 font-semibold">menu</span> for more options.
            </p>
          </div>
        )}
        {currentView === "profile" && userData && (
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

              {/* Accommodation Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Location</label>
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Occupation Type</label>
                  <select
                    name="occupationType"
                    value={formData.occupationType}
                    disabled
                    className="w-full p-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">College Name</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Year of Study</label>
                  <input
                    type="text"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">College Address</label>
                  <input
                    type="text"
                    name="collegeAddress"
                    value={formData.collegeAddress}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Budget Min</label>
                  <input
                    type="number"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Budget Max</label>
                  <input
                    type="number"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Room Type</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  >
                    <option value="">Select...</option>
                    <option value="single">Single</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Gender Preference</label>
                  <select
                    name="genderPreference"
                    value={formData.genderPreference}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="any">Any</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Food Preference</label>
                  <select
                    name="foodPreference"
                    value={formData.foodPreference}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm disabled:bg-gray-700 disabled:text-gray-400"
                  >
                    <option value="">Select...</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {["Laundry", "WiFi", "AC", "Parking", "Gym"].map((amenity) => (
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
      </main>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-black/80 z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "50%", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="p-4 flex justify-end">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-orange-600/20 transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="text-white p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="py-2">
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-orange-600/20 transition-colors text-sm"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;