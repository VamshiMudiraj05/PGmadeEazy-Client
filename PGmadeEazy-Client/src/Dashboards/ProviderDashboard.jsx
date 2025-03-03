"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Building, Users, Wallet, Plus, Settings } from "lucide-react"
import axios from "axios"

const ProviderDashboard = () => {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/properties", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProperties(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const stats = [
    {
      icon: Building,
      label: "Total Properties",
      value: properties.length,
    },
    {
      icon: Users,
      label: "Total Tenants",
      value: properties.reduce((acc, prop) => acc + (prop.occupiedRooms || 0), 0),
    },
    {
      icon: Wallet,
      label: "Monthly Revenue",
      value: `₹${properties.reduce((acc, prop) => acc + (prop.monthlyRevenue || 0), 0).toLocaleString()}`,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Provider Dashboard</h1>
        <button
          onClick={() => navigate("/add-property")}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add New Property
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
        <h2 className="text-xl font-bold text-white mb-4">Your Properties</h2>

        {loading ? (
          <p className="text-gray-400">Loading properties...</p>
        ) : properties.length === 0 ? (
          <div className="text-center py-8">
            <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No properties listed yet</p>
            <button
              onClick={() => navigate("/add-property")}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProviderDashboard

