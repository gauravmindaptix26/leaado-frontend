import logoIllustration from "../assets/Logo.png";
import { useState } from "react";
import api from "../api/axios";

const niches = [
  "Software",
  "Web Development",
  "Digital Marketing",
  "Social Media",
  "Graphic Design",
  "Content Writing",
  "SEO",
  "Consulting",
  "Other"
];

export default function AddNewClientModal({ open, onClose, onAddWebsites, onAddBulk }) {
  const [urlsInput, setUrlsInput] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [sourceWebsite, setSourceWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmitUrls = async () => {
    setError("");

    const sites = urlsInput
      .split(/[\n,]+/g)
      .map((s) => s.trim())
      .filter(Boolean);

    if (sites.length === 0) return;

    try {
      setSubmitting(true);
      const { data } = await api.post("/api/leads/bulk", {
        urls: sites,
        name: fullName,
        email: contactEmail,
        phone: contactPhone,
        service,
        message,
        website: sourceWebsite
      });

      if (!data?.success) return;

      onAddWebsites?.(data.leads || []);
      setUrlsInput("");
      setFullName("");
      setContactEmail("");
      setContactPhone("");
      setService("");
      setMessage("");
      setSourceWebsite("");
      onClose?.();

    } catch (err) {
      console.error("Failed to save websites", err);
      setError(err?.response?.data?.message || err.message || "Unable to save leads. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-2 sm:px-4 py-6">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 px-4 sm:px-6 py-5 overflow-y-auto modal-scroll">

            {/* Header */}
            <div className="bg-[#0047A6] text-white rounded-2xl px-5 py-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Client</h2>
              <button type="button" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm px-4 py-2">
                {error}
              </div>
            )}

            {/* URL Input */}
            <div>
              <textarea
                rows="4"
                placeholder="Enter target URLs, one per line (or comma separated)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 mt-4"
                value={urlsInput}
                onChange={(e) => setUrlsInput(e.target.value)}
              />
            </div>

            {/* FORM GRID */}
            <div className="mt-5 grid gap-4 md:grid-cols-4 text-sm text-gray-600">

              <label className="font-medium col-span-1">Full Name</label>
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Website Link or URL</label>
              <div className="col-span-3">
                <input
                  type="url"
                  placeholder="Enter link or URL of the website"
                  value={sourceWebsite}
                  onChange={(e) => setSourceWebsite(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Phone No.</label>
              <div className="col-span-3">
                <div className="flex rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                  <span className="px-4 py-3 text-gray-500 border-r border-gray-200">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="flex-1 px-4 py-3 bg-transparent placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <label className="font-medium col-span-1">Email Address</label>
              <div className="col-span-3">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Select Service</label>
              <div className="col-span-3 relative">
                <select
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option>Select one of the option</option>
                  {niches.map((niche) => (
                    <option key={niche}>{niche}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">⌄</span>
              </div>

            </div>

            {/* NOTE */}
            <div className="mt-4 rounded-xl bg-blue-50 text-blue-700 px-4 py-3 text-sm font-medium">
              NOTE: Your 5 free leads will be auto-tracked in your trial.
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-wrap gap-3 pb-4">
              <button
                type="button"
                onClick={handleSubmitUrls}
                disabled={submitting}
                className="flex-1 min-w-[180px] bg-[#0061FF] text-white py-3 rounded-lg font-semibold shadow hover:bg-[#004fd1] transition disabled:opacity-60"
              >
                {submitting ? "Processing..." : "START LEAD GENERATION"}
              </button>

              <button
                type="button"
                onClick={() => onAddBulk?.()}
                className="flex-1 min-w-[160px] bg-[#e8f1ff] text-[#0c2348] py-3 rounded-lg font-semibold hover:bg-[#dbe8ff] transition"
              >
                ADD BULK LEADS
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-w-[140px] border border-gray-300 py-3 rounded-lg font-semibold text-gray-800 hover:bg-gray-50"
              >
                CANCEL
              </button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="md:w-64 bg-gradient-to-b from-[#F5F9FF] to-[#E3EDFF] border-l border-blue-100 hidden md:flex items-center justify-center p-4">
            <img src={logoIllustration} alt="Client onboarding" className="w-32 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
