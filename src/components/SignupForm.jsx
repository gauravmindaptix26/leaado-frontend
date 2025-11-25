import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiUser, FiMail, FiPhone, FiLock, FiLayers, FiGlobe, FiChevronDown } from "react-icons/fi";

const initialValues = {
  fullName: "",
  email: "",
  mobile: "",
  country: "",
  niche: "",
  password: "",
  confirmPassword: ""
};

export default function SignupForm() {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.post("/api/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        country: formData.country
      });

      if (!data?.success) {
        throw new Error(data?.message || "Signup failed");
      }

      setMessage("Account created! Please log in.");
      setFormData(initialValues);
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-white space-y-3.5 sm:space-y-4"
    >
      {error && (
        <p className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-500/40 rounded-lg py-2 px-4">
          {error}
        </p>
      )}
      {message && (
        <p className="text-green-300 text-xs sm:text-sm bg-green-400/10 border border-green-300/40 rounded-lg py-2 px-4">
          {message}
        </p>
      )}

      {/* Full Name */}
      <div>
        <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Full Name</label>
        <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
          <FiUser className="text-gray-200 mr-2 flex-shrink-0" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full bg-transparent outline-none text-xs sm:text-base text-white placeholder-gray-300"
            required
          />
        </div>
      </div>

      {/* Mobile + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Mobile Number</label>
          <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiPhone className="text-gray-200 mr-2 flex-shrink-0" />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile no."
              className="w-full bg-transparent outline-none text-xs sm:text-base text-white placeholder-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Email Address</label>
          <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiMail className="text-gray-200 mr-2 flex-shrink-0" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full bg-transparent outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>
      </div>

      {/* Country + Niche */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Country</label>
          <div className="relative flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiGlobe className="text-gray-200 mr-2 flex-shrink-0" />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-transparent text-xs sm:text-base text-white outline-none appearance-none pr-6"
            >
              <option value="">Select your country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <FiChevronDown className="text-gray-200 absolute right-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Select your Niche</label>
          <div className="relative flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiLayers className="text-gray-200 mr-2 flex-shrink-0" />
            <select
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              className="w-full bg-transparent text-xs sm:text-base text-white outline-none appearance-none pr-6"
            >
              <option value="">Select one of the option</option>
              <option value="SaaS">SaaS</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Agencies">Agencies</option>
              <option value="Consulting">Consulting</option>
            </select>
            <FiChevronDown className="text-gray-200 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Password</label>
          <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiLock className="text-gray-200 mr-2 flex-shrink-0" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-transparent outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] sm:text-xs text-left w-full block mb-1.5">Confirm Password</label>
          <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-2 border border-transparent">
            <FiLock className="text-gray-200 mr-2 flex-shrink-0" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full bg-transparent outline-none text-xs sm:text-base text-white placeholder-gray-300"
              required
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0c80ff] hover:bg-[#0a74e6] disabled:opacity-60 disabled:cursor-not-allowed transition py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
      >
        {isSubmitting ? "Processing..." : "SIGNUP"}
      </button>

      <p className="text-center text-xs sm:text-sm text-gray-200 mt-2.5">
        Forgot Password?
      </p>
    </form>
  );
}
