import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import bg from "../assets/background.jpg";
import logo from "../assets/logo.png";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);

      if (res.data.success) {
        loginUser(res.data.token, res.data.user); // Pass both token and user data
      } else {
        alert("Invalid login credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col items-center text-center ">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-28 sm:w-24" />

          {/* Heading */}
          <div className="w-full rounded-lg px-4 sm:px-8 py-4 space-y-3 bg-black/10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white">
              Automate Your Outreach. Close More Deals.
            </h1>

            <p className="text-base md:text-lg text-[#d6e7ff] leading-7 max-w-4xl mx-auto">
              Join hundreds of freelancers and agencies growing faster with AI-powered outreach.
              <span className="block mt-1">
                Submit websites, select your service and let{" "}
                <span className="font-semibold italic">Leaaado.ai</span> find & contact your leads automatically.
              </span>
            </p>
          </div>

          <div className="w-full max-w-4xl rounded-lg px-4 sm:px-6 py-5 space-y-4 bg-black/10">
            {/* Tabs */}
            <div className="w-full rounded-xl gap-3 sm:gap-4 flex flex-col sm:flex-row">
              <Link
                to="/"
                className="flex-1 text-center py-2.5 sm:py-3 bg-white text-[#041029] font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                LOGIN
              </Link>

              <Link
                to="/signup"
                className="flex-1 text-center py-2.5 sm:py-3 text-white bg-[#0c2348] border border-[#0c2348] hover:bg-[#123065] transition rounded-lg"
              >
                SIGNUP
              </Link>
            </div>

            {/* Form (wrapped with handleLogin) */}
            <form onSubmit={handleLogin} className="w-full">
              <LoginForm setForm={setForm} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
