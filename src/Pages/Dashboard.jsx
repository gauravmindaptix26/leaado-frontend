import { useState, useContext, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
import SettingsSection from "../components/SettingsSection";
import ComingSoon from "../components/ComingSoon";
import {
  LuLayoutDashboard,
  LuFolderClosed,
  LuFileText,
  LuCreditCard,
  LuSettings
} from "react-icons/lu";

const navConfig = [
  { label: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { label: "Leads", path: "/leads", icon: LuFolderClosed },
  { label: "Pitch Templates", path: "/pitch-template", icon: LuFileText },
  { label: "Subscriptions", path: "/subscriptions", icon: LuCreditCard },
  { label: "Settings", path: "/settings", icon: LuSettings }
];

export default function Dashboard({ view = "Dashboard" }) {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState([]);

  const [openAddClient, setOpenAddClient] = useState(false);
  const [openBulkLeads, setOpenBulkLeads] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(leads.length / itemsPerPage));
  const activeLeadsCount = leads.length;
  const pitchesSuccess = leads.filter(
    (l) => l.status === "Success" || l.pitchResult === "Success"
  ).length;
  const pitchesFailed = leads.filter(
    (l) => l.status === "Failed" || l.pitchResult === "Failed" || l.result === "Failed"
  ).length;

  const mapLeads = (items) =>
    (items || [])
      .filter((l) => l.website)
      .map((l, idx) => ({
        id: l._id || `L${idx + 1}`.padStart(4, "0"),
        website: l.website,
        status: l.status || l.pitchResult || "Pending",
        pitchType: l.pitchType || "-",
        result: l.pitchResult || l.result || "-"
      }));

  const handleLogout = () => {
    logoutUser();
  };

  const closeSidebar = () => setSidebarOpen(false);
  const closeSettings = () => navigate("/dashboard");

  const handleNavSelect = (label) => {
    const target = navConfig.find((n) => n.label === label);
    navigate(target?.path || "/dashboard");
    closeSidebar();
  };

  const handleViewMessage = (lead) => {
    setSelectedLead(lead);
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setSelectedLead(null);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get("/api/leads");
        if (!data?.success) return;
        setLeads(mapLeads(data.leads));
      } catch (err) {
        console.error("Failed to load leads", err);
      }
    };
    fetchLeads();
  }, []);

  const handleAddLeads = async (websitesOrLeads) => {
    if (!Array.isArray(websitesOrLeads) || websitesOrLeads.length === 0) return;

    // If we receive lead objects from the modal/API, map them directly
    if (typeof websitesOrLeads[0] === "object" && websitesOrLeads[0].website) {
      setLeads(mapLeads(websitesOrLeads));
      setPage(1);
      return;
    }

    // Fallback: if we ever get a list of strings, post them
    try {
      const { data } = await api.post("/api/leads/websites", { websites: websitesOrLeads });
      if (!data?.success) return;
      setLeads(mapLeads(data.leads));
      setPage(1);
    } catch (err) {
      console.error("Failed to save leads", err);
    }
  };

  const activeNav = view;

  return (
    <div className="w-full h-screen overflow-y-auto flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-[#E6F0FF] z-20 flex-shrink-0">
        <Sidebar
          onLogout={handleLogout}
          activeItem={activeNav}
          onSelect={handleNavSelect}
          navItems={navConfig}
        />
      </aside>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 h-screen z-50 lg:hidden transition-transform duration-300 ease-in-out bg-[#E6F0FF] overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          onLogout={() => {
            handleLogout();
            closeSidebar();
          }}
          activeItem={activeNav}
          onSelect={handleNavSelect}
          navItems={navConfig}
        />
      </aside>

      {/* Main content area */}
      <main className="w-full lg:w-[calc(100%-288px)] lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile/Tablet header */}
        <div className="lg:hidden flex-shrink-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800 px-2">
            {activeNav}
          </h1>
          <div className="w-10" />
        </div>

        <div className="flex-1 w-full">
          <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
            {activeNav === "Dashboard" && (
              <>
                <DashboardHeader
                  onAddBulkLeads={() => setOpenBulkLeads(true)}
                  onAddNewClient={() => setOpenAddClient(true)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                  <StatsCard title="Active Leads" value={activeLeadsCount.toString()} />
                  <StatsCard title="Pitches Sent" value={pitchesSuccess.toString()} />
                  <StatsCard title="Pitches Failed" value={pitchesFailed.toString()} tone="negative" />
                  <StatsCard title="Revenue Generated" value="$25.30K" change="+80%" />
                  <StatsCard title="Trials Used" value="2" change="3 Credits Left Only" tone="negative" />
                </div>
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

            {activeNav === "Settings" && (
              <>
                <div className="fixed inset-0 z-40 bg-black/40" onClick={closeSettings} />
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4">
                  <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                    <SettingsSection onClose={closeSettings} />
                  </div>
                </div>
              </>
            )}

            {(activeNav === "Pitch Templates" || activeNav === "Subscriptions") && (
              <ComingSoon title={activeNav} />
            )}
          </div>
        </div>

        <div className="flex-shrink-0 border-t bg-white">
          <Footer />
        </div>
      </main>

      {/* Modals */}
      <AddNewClientModal
        open={openAddClient}
        onClose={() => setOpenAddClient(false)}
        onAddWebsites={handleAddLeads}
        onAddBulk={() => setOpenBulkLeads(true)}
      />
      <BulkLeadsModal open={openBulkLeads} onClose={() => setOpenBulkLeads(false)} />
      <ViewMessageModal open={openMessage} lead={selectedLead} onClose={handleCloseMessage} />
    </div>
  );
}
