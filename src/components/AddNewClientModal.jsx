import logoIllustration from "../assets/Logo.png";

import { useState } from "react";

const niches = ["Fitness", "Real Estate", "SaaS", "Agency", "E-commerce"];

export default function AddNewClientModal({ open, onClose, onAddWebsites }) {
  const [urlsInput, setUrlsInput] = useState("");

  if (!open) return null;

  const handleSubmitUrls = () => {
    const sites = urlsInput
      .split(/[\n,]+/g)
      .map((s) => s.trim())
      .filter(Boolean);

    if (sites.length === 0) return;

    onAddWebsites?.(sites);
    setUrlsInput("");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl rounded-[30px] bg-white shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 px-10 py-8">
            <div className="bg-[#0047A6] text-white rounded-2xl px-6 py-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Client</h2>
              <button type="button" onClick={onClose} aria-label="Close modal">
                ✕
              </button>
            </div>

             <div>
              <textarea
                rows="4"
                placeholder="Enter target URLs, one per line (or comma separated)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 mt-6 "
                value={urlsInput}
                onChange={(e) => setUrlsInput(e.target.value)}
              />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-4 text-sm text-gray-600">
              <label className="font-medium col-span-1">Full Name</label>
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Website Link or URL</label>
              <div className="col-span-3">
                <input
                  type="url"
                  placeholder="Enter link or URL of the website"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Phone No.</label>
              <div className="col-span-3">
                <div className="flex rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                  <span className="px-4 py-3 text-gray-500 border-r border-gray-200">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="flex-1 px-4 py-3 bg-transparent placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <label className="font-medium col-span-1">Email Address</label>
              <div className="col-span-3">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <label className="font-medium col-span-1">Select Service</label>
              <div className="col-span-3 relative">
                <select
                  className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option>Select one of the option</option>
                  {niches.map((niche) => (
                    <option key={niche}>{niche}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 text-blue-700 px-4 py-3 text-sm font-medium">
              NOTE: Your 5 free leads will be auto-tracked in your trial.
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleSubmitUrls}
                className="flex-1 min-w-[200px] bg-[#0061FF] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#004fd1] transition"
              >
                START LEAD GENERATION
              </button>
              <button
                type="button"
                onClick={() => onAddWebsites?.([])}
                className="flex-1 min-w-[200px] bg-[#E7F0FF] text-[#0047A6] py-3 rounded-xl font-semibold"
              >
                ADD BULK LEADS
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-w-[200px] border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
                CANCEL
              </button>
            </div>
          </div>

          <div className="md:w-72 bg-gradient-to-b from-[#F5F9FF] to-[#E3EDFF] border-l border-blue-100 hidden md:flex items-center justify-center p-6">
            <img src={logoIllustration} alt="Client onboarding" className="w-40 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
