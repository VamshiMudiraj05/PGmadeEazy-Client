"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Heart, Clock, MapPin, DiamondIcon as Indian, DollarSign } from "lucide-react"
import axios from "axios"

const SeekerDashboard = () => {
  const navigate = useNavigate()
  const [savedProperties, setSavedProperties] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const [savedPropertiesRes, recentSearchesRes] = await Promise.all([
          axios.get("http://localhost:5000/saved-properties", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/recent-searches", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])
        setSavedProperties(savedPropertiesRes.data)
        setRecentSearches(recentSearchesRes.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Seeker Dashboard</h1>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          Find PG
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-black/80 border border-orange-600 rounded-xl shadow-md shadow-orange-600/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600/20 rounded-lg">
              <Heart className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400">Saved Properties</p>
              <p className="text-2xl font-bold text-white">{savedProperties.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/80 border border-orange-600 rounded-xl shadow-md shadow-orange-600/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400">Recent Searches</p>
              <p className="text-2xl font-bold text-white">{recentSearches.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/80 border border-orange-600 rounded-xl shadow-md shadow-orange-600/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600/20 rounded-lg">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400">Preferred Location</p>
              <p className="text-lg font-bold text-white truncate">Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Properties */}
      <div className="bg-black/80 border border-orange-600 rounded-xl p-6 shadow-md shadow-orange-600/20 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Saved Properties</h2>

        {loading ? (
          <p className="text-gray-400">Loading saved properties...</p>
        ) : savedProperties.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No saved properties yet</p>
            <button
              onClick={() => navigate("/search")}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
            >
              Start Searching
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
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
                  <div className="flex items-center gap-2">
                    <Indian className="w-5 h-5 text-orange-500" />
                    <span className="text-white font-medium">{property.rent.toLocaleString()}/month</span>
                  </div>
                  <button
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="px-3 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      <div className="bg-black/80 border border-orange-600 rounded-xl p-6 shadow-md shadow-orange-600/20">
        <h2 className="text-xl font-bold text-white mb-4">Recent Searches</h2>

        {recentSearches.length === 0 ? (
          <p className="text-gray-400">No recent searches</p>
        ) : (
          <div className="space-y-4">
            {recentSearches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-4 bg-black/60 border border-gray-800 rounded-lg hover:border-orange-600 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white">{search.location}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />₹{search.budget.toLocaleString()}
                      </span>
                      <span>{search.roomType}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/search?${new URLSearchParams(search.params)}`)}
                  className="px-3 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Search Again
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeekerDashboard

