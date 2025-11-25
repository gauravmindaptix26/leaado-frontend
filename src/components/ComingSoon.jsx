export default function ComingSoon({ title = "Coming Soon" }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-6 sm:px-10 py-10 sm:py-14 max-w-3xl w-full text-center">
        <div className="mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0c80ff] to-[#0a4bd1] flex items-center justify-center text-white text-2xl font-bold">
          ✦
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
          We&apos;re crafting something great here. Check back soon for new features tailored to your outreach experience.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#0c80ff] font-semibold text-sm shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#0c80ff]" />
          In Progress
        </div>
      </div>
    </div>
  );
}
