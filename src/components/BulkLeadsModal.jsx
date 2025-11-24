import { useEffect, useRef, useState } from "react";
import { FiX, FiUploadCloud, FiCheck, FiTrash2, FiUpload } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ACCEPTED_FILE_TYPES = ".csv,.pdf,.xls,.xlsx";

const FileActionButton = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className={`h-9 w-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function BulkLeadsModal({ open, onClose }) {
  const [leads, setLeads] = useState([]);
  const [importLink, setImportLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      fetchLeads();
    } else {
      setImportLink("");
      setFeedback(null);
    }
  }, [open]);

  const showFeedback = (message, tone = "success") => {
    setFeedback({ message, tone });
    setTimeout(() => setFeedback(null), 3000);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/leads`);
      const data = await response.json();
      if (response.ok) {
        setLeads(data.leads || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Unable to load leads", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilesUpload = async (filesList) => {
    if (!filesList?.length) return;
    const formData = new FormData();
    Array.from(filesList).forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      const response = await fetch(`${API_BASE_URL}/api/leads/upload`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload files");
      }
      setLeads((prev) => [...data.leads, ...prev]);
      showFeedback("Files uploaded successfully");
    } catch (error) {
      console.error(error);
      showFeedback(error.message, "error");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUploading(false);
    }
  };

  const handleFileInputChange = (event) => {
    handleFilesUpload(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFilesUpload(event.dataTransfer.files);
  };

  const handleDelete = async (leadId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to delete lead");
      }
      setLeads((prev) => prev.filter((lead) => lead._id !== leadId));
      showFeedback("Lead removed");
    } catch (error) {
      console.error(error);
      showFeedback(error.message, "error");
    }
  };

  const handlePreview = (lead) => {
    if (lead.sourceType === "file" && lead.fileUrl) {
      window.open(`${API_BASE_URL}${lead.fileUrl}`, "_blank", "noopener");
    } else if (lead.sourceType === "url" && lead.importUrl) {
      window.open(lead.importUrl, "_blank", "noopener");
    }
  };

  const handleSave = async () => {
    if (!importLink.trim()) {
      showFeedback("Leads saved successfully");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/api/leads/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: importLink.trim() })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to save link");
      }
      setLeads((prev) => [data.lead, ...prev]);
      setImportLink("");
      showFeedback("Lead imported from URL");
    } catch (error) {
      console.error(error);
      showFeedback(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">
          <div className="bg-[#004AA8] text-white flex items-center justify-between px-8 py-4">
            <h2 className="text-xl font-semibold">Add Leads in Bulk</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-gray-200"
              aria-label="Close bulk leads modal"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            {feedback && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  feedback.tone === "error"
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-green-50 text-green-700 border border-green-100"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-600">Upload Document or URL</p>
              <div
                className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-10 flex flex-col items-center text-center text-gray-500 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="h-16 w-16 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-500">
                  <FiUploadCloud className="text-3xl" />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Choose document to upload here (CSV, PDF, XLS format.)
                </p>
                <p className="text-xs text-gray-400">
                  {uploading ? "Uploading..." : "Click or drag files to upload"}
                </p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  accept={ACCEPTED_FILE_TYPES}
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {loading && (
                <p className="text-gray-500 text-sm col-span-full">Loading uploaded files...</p>
              )}
              {!loading && leads.length === 0 && (
                <p className="text-gray-500 text-sm col-span-full text-center">
                  No files uploaded yet.
                </p>
              )}

              {leads.map((lead) => (
                <div
                  key={lead._id}
                  className="rounded-2xl border border-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.05)] bg-white px-4 py-3 flex items-center gap-3"
                >
                  <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                    <FiUploadCloud />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {lead.originalName}
                    </p>
                    <button
                      type="button"
                      onClick={() => handlePreview(lead)}
                      className="mt-1 text-xs uppercase tracking-wide font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg"
                    >
                      Preview {lead.sourceType === "url" ? "Link" : "PDF"}
                    </button>
                  </div>

                  <FileActionButton
                    className={
                      lead.status === "ready"
                        ? "text-blue-600 border-blue-100 bg-blue-50"
                        : "text-gray-500"
                    }
                    title={lead.status === "ready" ? "Ready" : "Processing"}
                  >
                    {lead.status === "ready" ? <FiCheck /> : <FiUpload />}
                  </FileActionButton>

                  <FileActionButton
                    className="text-red-500 border-red-100"
                    onClick={() => handleDelete(lead._id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </FileActionButton>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-dashed border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Import from URL</p>
              <input
                type="text"
                placeholder="Enter or paste the link here"
                value={importLink}
                onChange={(event) => setImportLink(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-white flex flex-wrap gap-4 border-t border-gray-100">
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="bg-[#0A63FF] text-white font-semibold px-8 py-3 rounded-xl shadow hover:bg-[#084fd1] disabled:opacity-60"
            >
              {saving ? "Saving..." : "SAVE LEADS"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-gray-700 font-semibold px-8 py-3 rounded-xl border border-gray-200"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
