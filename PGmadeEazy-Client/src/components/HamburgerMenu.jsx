"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X, User, LogOut, Settings, Bell, Heart, Building, Search } from "lucide-react" // Ensure all icons are imported correctly

const HamburgerMenu = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    navigate("/login")
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Menu items based on user type
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
  ]

  // Add user type specific menu items
  if (userType === "seeker") {
    menuItems.push({
      icon: Heart,
      label: "Saved Properties",
      onClick: () => navigate("/saved-properties"),
    })
    menuItems.push({
      icon: Search,
      label: "Search PGs",
      onClick: () => navigate("/search"),
    })
  } else if (userType === "provider") {
    menuItems.push({
      icon: Building,
      label: "My Properties",
      onClick: () => navigate("/my-properties"),
    })
  }

  // Add logout at the end
  menuItems.push({
    icon: LogOut,
    label: "Logout",
    onClick: handleLogout,
    className: "text-red-500 hover:bg-red-500/10",
  })

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
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
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
  )
}

export default HamburgerMenu
