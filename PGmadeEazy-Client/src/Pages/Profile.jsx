"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart, User, Settings, LogOut, Search, MapPin, DollarSign } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
        const user = response.data.find((user) => user.email === userEmail);
        setUserData(user);
        setEditedData({ ...user });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userData.id}`,
        editedData
      );

      if (response.status === 200) {
        setUserData(editedData);
        setIsEditing(false);

        const userType = localStorage.getItem("userType");
        if (userType === "seeker") {
          navigate("/seeker-dashboard");
        } else if (userType === "provider") {
          navigate("/provider-dashboard");
        }
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black/90 backdrop-blur-lg flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>

        {/* Profile Information Card */}
        <div className="bg-black/80 p-6 rounded-lg border border-orange-600 shadow-md shadow-orange-600/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Full Name */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Full Name</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editedData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Email</h2>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Phone</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.phone}</p>
              )}
            </div>

            {/* Preferred Location */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Preferred Location</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="preferredLocation"
                  value={editedData.preferredLocation}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.preferredLocation}</p>
              )}
            </div>

            {/* Budget Min */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Budget Min</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="budgetMin"
                  value={editedData.budgetMin}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.budgetMin}</p>
              )}
            </div>

            {/* Budget Max */}
            <div className="text-white">
              <h2 className="font-semibold text-lg">Budget Max</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="budgetMax"
                  value={editedData.budgetMax}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-black/60 text-white rounded-md border border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-400">{userData.budgetMax}</p>
              )}
            </div>
          </div>

          {/* Edit and Save Button */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition-all"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>

            {isEditing && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
