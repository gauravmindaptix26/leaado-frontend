import { FiX } from "react-icons/fi";

export default function ViewMessageModal({ open, lead, onClose }) {
  if (!open || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-white bg-blue-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          aria-label="Close message"
        >
          <FiX className="text-xl" />
        </button>

        <div className="bg-blue-900 text-white font-semibold text-lg px-6 py-3 rounded-2xl inline-flex items-center gap-3">
          View Message
        </div>

        <div className="mt-6">
          <p className="text-gray-900 font-semibold">
            Pitch Message Sent to:{" "}
            <span className="font-normal text-gray-700">{lead.messageRecipient}</span>
          </p>

          <div className="mt-4 bg-blue-50 text-gray-700 text-sm md:text-base leading-relaxed rounded-2xl p-5">
            {lead.pitchMessage}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            EDIT PITCH TEMPLATE
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
