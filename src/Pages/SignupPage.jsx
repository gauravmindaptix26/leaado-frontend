import { Link } from "react-router-dom";
import bg from "../assets/background.jpg";
import SignupForm from "../components/SignupForm";
import logo from "../assets/Logo.png";

export default function SignupPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="relative z-10 h-full w-full flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-4">
          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="w-24 sm:w-28 drop-shadow-[0_0_16px_rgba(0,0,0,0.6)] brightness-125 bg-black/30 rounded-full p-3 object-contain"
          />

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-white">
            Automate Your Outreach. Close More Deals.
          </h1>

          <p className="text-base md:text-lg text-[#d6e7ff] leading-7 max-w-4xl mx-auto">
            Join hundreds of freelancers and agencies growing faster with AI-powered outreach.
            <span className="block mt-1">
              Submit websites, select your service and let{" "}
              <span className="font-semibold italic">Leaaado.ai</span> find & contact your leads automatically.
            </span>
          </p>

          {/* Tabs */}
          <div className="w-full max-w-3xl rounded-xl gap-3 sm:gap-4 flex flex-col sm:flex-row">
            <Link
              to="/"
              className="flex-1 text-center py-2.5 sm:py-3 text-white bg-[#0c2348] border border-[#0c2348] hover:bg-[#123065] transition rounded-lg text-sm sm:text-base font-semibold"
            >
              LOGIN
            </Link>

            <Link
              to="/signup"
              className="flex-1 text-center py-2.5 sm:py-3 bg-white text-[#041029] font-semibold rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
            >
              SIGNUP
            </Link>
          </div>

          {/* Signup Form Component */}
          <div className="w-full max-w-3xl bg-[#050c1c]/92 border border-[#0d1c36] rounded-2xl shadow-2xl px-4 sm:px-5 md:px-6 py-4">
            <SignupForm />
          </div>

          <p className="text-xs text-[#7dc3ff] italic">
            * * * Get First 5 leads free - Try before you pay.
          </p>
        </div>
      </div>
    </div>
  );
}
