"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, ArrowRight, Check, Home, Building } from "lucide-react"

const MultiStepRegistration = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Seeker fields
    preferredLocation: "",
    budgetMin: "",
    budgetMax: "",
    roomType: "",
    amenities: [],
    genderPreference: "",
    moveInDate: "",

    // Provider fields
    businessName: "",
    city: "",
    propertyOwnershipType: "",
    numberOfPGs: "",
    rentCollectionMethod: "",
  })

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  // Calculate total steps based on user type
  const totalSteps = userType ? 4 : 1

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.round((step / totalSteps) * 100)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      })
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item) => item !== value),
      })
    }
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    setStep(2)
  }

  const validateStep = () => {
    const newErrors = {}

    if (step === 2) {
      // Validate common fields
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits"
      }
      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (step === 3 && userType === "seeker") {
      if (!formData.preferredLocation.trim()) newErrors.preferredLocation = "Location is required"
      if (!formData.budgetMin.trim() || !formData.budgetMax.trim()) newErrors.budget = "Budget range is required"
      if (!formData.roomType) newErrors.roomType = "Room type is required"
      if (!formData.genderPreference) newErrors.genderPreference = "Gender preference is required"
    }

    if (step === 3 && userType === "provider") {
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.propertyOwnershipType) newErrors.propertyOwnershipType = "Property ownership type is required"
      if (!formData.numberOfPGs) newErrors.numberOfPGs = "Number of PGs is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!validateStep()) {
      return
    }

    try {
      setMessage("Processing registration...")
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        ...formData,
        userType,
      })
      setMessage("Registration successful!")
      // Navigate to SignIn.jsx for both user types
      navigate("/sign-in")
    } catch (err) {
      setMessage("Registration failed. Please try again.")
      console.error(err)
    }
  }

  // Render form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-white text-center">I am looking to...</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className={`p-6 border-2 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 ${
                  userType === "seeker"
                    ? "border-orange-500 bg-black/80 shadow-md shadow-orange-600/20"
                    : "border-gray-700 bg-black/60 hover:border-orange-600"
                }`}
              >
                <div className="w-16 h-16 bg-black/80 rounded-full flex items-center justify-center border border-orange-600">
                  <Home className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
                <span className="font-medium text-white">Find Accommodation</span>
                <span className="text-sm text-gray-400">I'm a Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className={`p-6 border-2 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 ${
                  userType === "provider"
                    ? "border-orange-500 bg-black/80 shadow-md shadow-orange-600/20"
                    : "border-gray-700 bg-black/60 hover:border-orange-600"
                }`}
              >
                <div className="w-16 h-16 bg-black/80 rounded-full flex items-center justify-center border border-orange-600">
                  <Building className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
                <span className="font-medium text-white">List My Property</span>
                <span className="text-sm text-gray-400">I'm a Provider</span>
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white">Basic Information</h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.fullName ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.password ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        )

      case 3:
        if (userType === "seeker") {
          return (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">Accommodation Preferences</h3>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Preferred Location</label>
                <input
                  type="text"
                  name="preferredLocation"
                  placeholder="City, Area, Near College/Office"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.preferredLocation ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.preferredLocation && <p className="text-red-500 text-xs mt-1">{errors.preferredLocation}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Budget Range (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="budgetMin"
                    placeholder="Min"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    className={`w-1/2 p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.budget ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  <input
                    type="number"
                    name="budgetMax"
                    placeholder="Max"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    className={`w-1/2 p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.budget ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                </div>
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Preferred Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.roomType ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="" className="bg-black text-gray-400">
                    Select Room Type
                  </option>
                  <option value="private" className="bg-black text-white">
                    Private Room
                  </option>
                  <option value="shared" className="bg-black text-white">
                    Shared Room
                  </option>
                  <option value="any" className="bg-black text-white">
                    Any
                  </option>
                </select>
                {errors.roomType && <p className="text-red-500 text-xs mt-1">{errors.roomType}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Gender Preference</label>
                <select
                  name="genderPreference"
                  value={formData.genderPreference}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.genderPreference ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="" className="bg-black text-gray-400">
                    Select Gender Preference
                  </option>
                  <option value="male" className="bg-black text-white">
                    Male
                  </option>
                  <option value="female" className="bg-black text-white">
                    Female
                  </option>
                  <option value="any" className="bg-black text-white">
                    Any
                  </option>
                </select>
                {errors.genderPreference && <p className="text-red-500 text-xs mt-1">{errors.genderPreference}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Required Amenities</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {["WiFi", "AC", "Food", "Laundry", "Parking", "TV", "Gym", "Security"].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity}
                        value={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-orange-500 border-gray-700 rounded focus:ring-orange-500 bg-black/60"
                      />
                      <label htmlFor={amenity} className="ml-2 text-sm text-gray-300">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">Property Information</h3>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Business Name (Optional)</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Your business name (if applicable)"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">City/Town</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Where your property is located"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.city ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Property Ownership Type</label>
                <select
                  name="propertyOwnershipType"
                  value={formData.propertyOwnershipType}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.propertyOwnershipType ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="" className="bg-black text-gray-400">
                    Select Ownership Type
                  </option>
                  <option value="owner" className="bg-black text-white">
                    Owner
                  </option>
                  <option value="manager" className="bg-black text-white">
                    Manager
                  </option>
                </select>
                {errors.propertyOwnershipType && (
                  <p className="text-red-500 text-xs mt-1">{errors.propertyOwnershipType}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Number of PGs Managed</label>
                <select
                  name="numberOfPGs"
                  value={formData.numberOfPGs}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-black/60 border rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.numberOfPGs ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="" className="bg-black text-gray-400">
                    Select Number
                  </option>
                  <option value="1" className="bg-black text-white">
                    1
                  </option>
                  <option value="2" className="bg-black text-white">
                    2
                  </option>
                  <option value="3+" className="bg-black text-white">
                    3+
                  </option>
                </select>
                {errors.numberOfPGs && <p className="text-red-500 text-xs mt-1">{errors.numberOfPGs}</p>}
              </div>
            </div>
          )
        }

      case 4:
        if (userType === "seeker") {
          return (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">Additional Preferences</h3>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="bg-black/80 border border-orange-600 p-4 rounded-xl mt-2 shadow-md shadow-orange-600/20">
                <h4 className="font-medium text-orange-500">What happens next?</h4>
                <p className="text-sm text-gray-400 mt-1">
                  After registration, you'll be redirected to PG listings that match your preferences.
                </p>
              </div>
            </div>
          )
        } else {
          return (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">Final Details</h3>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">How Do You Collect Rent?</label>
                <select
                  name="rentCollectionMethod"
                  value={formData.rentCollectionMethod}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-black text-gray-400">
                    Select Method
                  </option>
                  <option value="online" className="bg-black text-white">
                    Online
                  </option>
                  <option value="cash" className="bg-black text-white">
                    Cash
                  </option>
                  <option value="both" className="bg-black text-white">
                    Both
                  </option>
                </select>
              </div>

              <div className="bg-black/80 border border-orange-600 p-4 rounded-xl mt-2 shadow-md shadow-orange-600/20">
                <h4 className="font-medium text-orange-500">What happens next?</h4>
                <p className="text-sm text-gray-400 mt-1">
                  After registration, you'll be redirected to your dashboard where you can add full property details and
                  photos.
                </p>
              </div>
            </div>
          )
        }

      default:
        return null
    }
  }

  return (
    <section className="py-20 bg-black/90 backdrop-blur-lg min-h-screen flex items-center justify-center">
      <div className="container max-w-md bg-black/80 p-6 rounded-xl border border-orange-600 shadow-lg shadow-orange-600/20">
        <h2 className="text-3xl font-bold text-center text-white">
          {step === 1 ? "Get Started" : userType === "seeker" ? "Seeker Registration" : "Provider Registration"}
        </h2>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 h-2 rounded-full mt-6">
          <div
            className="h-2 bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">
          Step {step} of {totalSteps}
        </p>

        <form onSubmit={handleRegister} className="mt-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-1 px-4 py-2 text-gray-300 bg-black/60 border border-gray-700 rounded-lg hover:bg-black/80 hover:border-orange-600 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className={`flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300 ml-auto ${
                  step === 1 && !userType ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={step === 1 && !userType}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-1 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300 ml-auto"
              >
                Complete Registration
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-xl border text-center text-sm ${
              message.includes("successful")
                ? "bg-black/80 border-green-500 text-green-400"
                : "bg-black/80 border-orange-600 text-orange-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  )
}

export default MultiStepRegistration

