"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthState";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setMessage("Checking credentials...");
      const { data: users } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);

      const foundUser = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (foundUser) {
        setMessage("Login successful!");

        // ✅ Dispatch to context — updates global auth state
        dispatch({
          type: "LOGIN",
          payload: {
            email: foundUser.email,
            userType: foundUser.userType,
            name: foundUser.name,
            isAuthenticated: true
          }
        });

        // Navigate to the right dashboard
        if (foundUser.userType === "seeker") {
          navigate("/seeker");
        } else if (foundUser.userType === "provider") {
          navigate("/provider");
        }
      } else {
        setMessage("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setMessage("Failed to fetch users. Please try again later.");
      console.error(err);
    }
  };

  return (
    <section className="py-20 bg-black/90 backdrop-blur-lg min-h-screen flex items-center justify-center">
      <div className="container max-w-md bg-black/80 p-6 rounded-xl border border-orange-600 shadow-lg shadow-orange-600/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full p-2.5 pl-10 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full p-2.5 pl-10 bg-black/60 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
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
                className="w-4 h-4 text-orange-500 bg-black/60 border-gray-700 rounded focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all"
          >
            Login
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-xl border text-center text-sm ${
              message.includes("successful")
                ? "border-green-500 text-green-400"
                : "border-orange-600 text-orange-400"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/get-started" className="text-orange-500 hover:text-orange-400">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
