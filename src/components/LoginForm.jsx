import { useState } from "react";
import { FiMail, FiLock, FiEye } from "react-icons/fi";

export default function LoginForm({ setForm, loading }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full mt-4 sm:mt-6 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-[#0d1c36] bg-[#050c1c]/90">
      {/* Email */}
      <label className="block text-left text-xs sm:text-sm mb-2 text-white">Email</label>
      <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-3 mb-4">
        <FiMail className="text-gray-300 mr-2 flex-shrink-0" />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-transparent outline-none text-xs sm:text-sm text-white placeholder:text-gray-400"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      {/* Password */}
      <label className="block text-left text-xs sm:text-sm mb-2 text-white">Password</label>
      <div className="flex items-center bg-[#0d2a56] rounded-lg px-3 py-2 sm:py-3 mb-4">
        <FiLock className="text-gray-300 mr-2 flex-shrink-0" />
        <input
          type={showPass ? "text" : "password"}
          placeholder="Enter password"
          className="w-full bg-transparent outline-none text-xs sm:text-sm text-white placeholder:text-gray-400"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <FiEye
          onClick={() => setShowPass(!showPass)}
          className="cursor-pointer text-gray-300 flex-shrink-0 ml-2"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-center mb-4 space-x-2">
        <input type="checkbox" className="accent-blue-600" defaultChecked />
        <span className="text-xs sm:text-sm text-white">Remember Me</span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "LOGIN"}
      </button>

      {/* Forgot Password */}
      <p className="text-center text-gray-300 mt-4 cursor-pointer hover:underline text-xs sm:text-sm">
        Forgot Password?
      </p>
    </div>
  );
}
