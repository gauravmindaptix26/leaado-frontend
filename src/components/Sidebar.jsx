import SidebarUserCard from "./SidebarUserCard";
import SidebarMenuItem from "./SidebarMenuItem";
import logo from "../assets/Logo.png";

export default function Sidebar({ onLogout, activeItem = "Dashboard", onSelect, navItems = [] }) {
  const handleSelect = (label) => {
    onSelect?.(label);
  };

  return (
    <aside className="w-full h-full flex flex-col bg-[#E6F0FF] border-r border-blue-100">
      {/* Sidebar content - scrollable */}
      <div className=" px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Leaado" className="w-16 sm:w-20 object-contain" />
        </div>

        {/* User Card */}
        <SidebarUserCard />

        {/* Navigation Menu */}
        <nav className="mt-6 sm:mt-10 space-y-2">
          {navItems.map((item) => (
            <SidebarMenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={activeItem === item.label}
              onClick={() => handleSelect(item.label)}
            />
          ))}
        </nav>

        {/* Logout - Now inside sidebar */}
        <button
          type="button"
          onClick={onLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 
                 rounded-xl border border-red-200 text-red-500 font-semibold 
                 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-red-50 transition"
        >
          Log Out
        </button>

      </div>


    </aside>
  );
}
