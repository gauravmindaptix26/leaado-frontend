import { useState, useContext, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { StatsCard } from "../components/StatsCard";
import RevenueCard from "../components/RevenueCard";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import AddNewClientModal from "../components/AddNewClientModal";
import ViewMessageModal from "../components/ViewMessageModal";
import BulkLeadsModal from "../components/BulkLeadsModal";
import LeadsSection from "../components/LeadsSection";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const handleLogout = () => {
    logoutUser();
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Leads state (user-provided websites)
  const [leads, setLeads] = useState([]);

  const [openAddClient, setOpenAddClient] = useState(false);
  const [openBulkLeads, setOpenBulkLeads] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleViewMessage = (lead) => {
    setSelectedLead(lead);
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setSelectedLead(null);
  };

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(leads.length / itemsPerPage));

  // Load leads from API on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get("/api/leads");
        if (!data?.success) return;
        const mapped = (data.leads || [])
          .filter((l) => l.website)
          .map((l, idx) => ({
            id: l._id || `L${idx + 1}`.padStart(4, "0"),
            website: l.website,
            status: l.status || "Pending",
            pitchType: "-",
            result: "-"
          }));
        setLeads(mapped);
      } catch (err) {
        console.error("Failed to load leads", err);
      }
    };
    fetchLeads();
  }, []);

  const handleAddLeads = async (websites) => {
    if (!Array.isArray(websites) || websites.length === 0) return;
    try {
      const { data } = await api.post("/api/leads/websites", { websites });
      if (!data?.success) return;

      const mapped = (data.leads || [])
        .filter((l) => l.website)
        .map((l, idx) => ({
          id: l._id || `L${idx + 1}`.padStart(4, "0"),
          website: l.website,
          status: l.status || "Pending",
          pitchType: "-",
          result: "-"
        }));

      setLeads(mapped);
      setPage(1);
    } catch (err) {
      console.error("Failed to save leads", err);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto flex bg-gray-50">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-[#E6F0FF] z-20 flex-shrink-0">
        <Sidebar onLogout={handleLogout} activeItem={activeNav} onSelect={setActiveNav} />
      </aside>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar - Fixed overlay */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 h-screen z-50 lg:hidden transition-transform duration-300 ease-in-out bg-[#E6F0FF] overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          onLogout={() => { handleLogout(); closeSidebar(); }}
          activeItem={activeNav}
          onSelect={(label) => {
            setActiveNav(label);
            closeSidebar();
          }}
        />
      </aside>

      {/* Main content area */}
      <main className="w-full lg:w-[calc(100%-288px)] lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile/Tablet header with hamburger menu */}
        <div className="lg:hidden flex-shrink-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800 px-2">Dashboard</h1>
          <div className="w-10" />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 w-full">
          <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
            {activeNav !== "Leads" && (
              <>
                {/* Dashboard Header */}
                <DashboardHeader
                  onAddBulkLeads={() => setOpenBulkLeads(true)}
                  onAddNewClient={() => setOpenAddClient(true)}
                />

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                  <StatsCard title="Active Leads" value="25" change="+25%" />
                  <StatsCard title="Pitches Sent" value="51" change="+45%" />
                  <StatsCard title="Success Rate" value="26" change="+60%" />
                  <StatsCard title="Revenue Generated" value="$25.30K" change="+80%" />
                  <StatsCard title="Trials Used" value="2" change="3 Credits Left Only" tone="negative" />
                </div>

               

                {/* Leads Section inside dashboard view */}
                <LeadsSection
                  search={search}
                  setSearch={setSearch}
                  leads={leads}
                  page={page}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setPage}
                  onAddLeads={() => setOpenAddClient(true)}
                  onAddBulk={() => setOpenBulkLeads(true)}
                  onViewMessage={handleViewMessage}
                />

                 {/* Revenue Card */}
                <div className="mt-2">
                  <RevenueCard />
                </div>
              </>
            )}

            {activeNav === "Leads" && (
              <LeadsSection
                search={search}
                setSearch={setSearch}
                leads={leads}
                page={page}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={setPage}
                onAddLeads={() => setOpenAddClient(true)}
                onAddBulk={() => setOpenBulkLeads(true)}
                onViewMessage={handleViewMessage}
              />
            )}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 border-t bg-white">
          <Footer />
        </div>
      </main>

      {/* Modals */}
      <AddNewClientModal
        open={openAddClient}
        onClose={() => setOpenAddClient(false)}
        onAddWebsites={handleAddLeads}
      />
      <BulkLeadsModal open={openBulkLeads} onClose={() => setOpenBulkLeads(false)} />
      <ViewMessageModal open={openMessage} lead={selectedLead} onClose={handleCloseMessage} />
    </div>
  );
}
