import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SettingsSection({ onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [originalProfile, setOriginalProfile] = useState(null);

  // Fetch logged-in user profile when settings open
  useEffect(() => {
    const fetchProfile = async () => {
      setError("");
      try {
        const { data } = await api.get("/api/users/profile");
        if (data?.success && data?.user) {
          const incomingProfile = {
            fullName: data.user.fullName || "",
            email: data.user.email || "",
            phone: data.user.phone || data.user.mobile || "",
          };

          setOriginalProfile(incomingProfile);
          setForm((prev) => ({
            ...prev,
            ...incomingProfile,
          }));
        } else {
          setError(data?.message || "Unable to load your profile.");
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
        setError("Unable to load your profile.");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 10) return;
      setForm((prev) => ({ ...prev, phone: cleaned }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.phone && form.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (form.newPassword && !form.currentPassword) {
      setError("Enter your current password to set a new password.");
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.put("/api/users/profile", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
      });

      if (data?.success) {
        const updatedUser = {
          fullName: data.user?.fullName ?? form.fullName,
          email: data.user?.email ?? form.email,
          phone: data.user?.phone ?? form.phone,
        };

        setMessage(data?.message || "Profile updated successfully.");
        setOriginalProfile(updatedUser);
        setForm((prev) => ({
          ...prev,
          ...updatedUser,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setError(data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err?.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 text-center text-gray-600">Loading your profile...</div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-lg p-4 sm:p-6 max-w-4xl w-full mx-auto relative">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Update your personal details. Leave password fields empty if you do
            not want to change your password.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition rounded-full p-2"
          >
            X
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-600 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 text-green-700 px-4 py-2 text-sm">
          {message}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {originalProfile?.fullName && (
              <p className="text-xs text-gray-500 mb-1">
                Current: {originalProfile.fullName}
              </p>
            )}
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {originalProfile?.email && (
              <p className="text-xs text-gray-500 mb-1">
                Current: {originalProfile.email}
              </p>
            )}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            {originalProfile && (
              <p className="text-xs text-gray-500 mb-1">
                Current: {originalProfile.phone || "Not set"}
              </p>
            )}
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength="10"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {form.phone && form.phone.length !== 10 && (
              <p className="text-red-500 text-xs mt-1">
                Phone number must be 10 digits.
              </p>
            )}
          </div>
        </div>

        {/* Password Change */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-[#0c80ff] text-white font-semibold hover:bg-[#0a74e6] transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
