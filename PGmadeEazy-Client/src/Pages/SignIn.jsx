"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

<<<<<<< HEAD
=======
    // Clear error for this field if it exists
>>>>>>> features/login
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

<<<<<<< HEAD
    if (!formData.password.trim()) {
=======
    if (!formData.password) {
>>>>>>> features/login
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setMessage("Logging in...")
<<<<<<< HEAD

      const response = await axios.get("http://localhost:5000/users")
      const users = response.data

      const foundUser = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      )

      if (foundUser) {
        setMessage("Login successful!")

        localStorage.setItem("user", JSON.stringify(foundUser))

        if (foundUser.userType === "seeker") {
          navigate("/seeker-dashboard")
        } else if (foundUser.userType === "provider") {
          navigate("/provider-dashboard")
        }
      } else {
        setMessage("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setMessage("Login failed. Something went wrong.")
      console.error("Login Error:", err)
=======
      const response = await axios.post("http://localhost:5000/login", formData)
      setMessage("Login successful!")

      // Store the token or user data in localStorage or context
      localStorage.setItem("token", response.data.token)

      // Redirect to dashboard or home page
      navigate("/dashboard")
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please try again.")
      console.error(err)
>>>>>>> features/login
    }
  }

  return (
    <section className="py-20 bg-black/90 backdrop-blur-lg min-h-screen flex items-center justify-center">
      <div className="container max-w-md bg-black/80 p-6 rounded-xl border border-orange-600 shadow-lg shadow-orange-600/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full p-2.5 pl-10 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full p-2.5 pl-10 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.password ? "border-red-500" : "border-gray-700"
                }`}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-orange-500 border-gray-700 rounded focus:ring-orange-500 bg-black/60"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
          >
            Login
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-xl border text-center text-sm flex items-center justify-center gap-2 ${
              message.includes("successful")
                ? "bg-black/80 border-green-500 text-green-400"
                : "bg-black/80 border-orange-600 text-orange-400"
            }`}
          >
            {message.includes("successful") ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:text-orange-400 transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
<<<<<<< HEAD
=======

>>>>>>> features/login
