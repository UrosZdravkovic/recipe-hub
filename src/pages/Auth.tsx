import bgImage from "@/assets/images/backgrond.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SignIn from "@/components/custom/authorization/SignIn";
import SignUp from "@/components/custom/authorization/SignUp";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignIn = location.pathname.includes("sign-in");
  const isSignUp = location.pathname.includes("sign-up");


  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden font-sans"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Brand / Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-white text-2xl font-semibold tracking-tight drop-shadow-sm">
              Recipe Hub
            </h1>
            <p className="text-white/70 text-xs mt-1">Save, explore and enjoy.</p>
          </div>

          {/* Switch */}
          <div className="mb-5 relative">
            <div className="grid grid-cols-2 p-1 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm relative">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute top-1 left-1 w-[calc(50%-4px)] h-10 rounded-lg bg-white shadow z-0"
                animate={{ x: isSignIn ? "100%" : "0%" }}
              />
              <NavLink
                to="/auth/sign-up"
                className={({ isActive }) =>
                  `h-10 flex items-center justify-center rounded-lg text-sm font-medium transition relative z-10 ${
                    isActive
                      ? "text-orange-600"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/auth/sign-in"
                className={({ isActive }) =>
                  `h-10 flex items-center justify-center rounded-lg text-sm font-medium transition relative z-10 ${
                    isActive
                      ? "text-orange-600"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                Sign In
              </NavLink>
            </div>
          </div>

          {/* Form container */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {isSignIn && (
                <motion.div
                  key="sign-in"
                  initial={{ opacity: 0, y: 50, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.98 }}
                  transition={{
                    y: { duration: 0.2, ease: "easeOut" },
                    scale: { duration: 0.2, ease: "easeOut" },
                    opacity: { duration: 0.2, ease: "easeOut", delay: 0.05 },
                  }}
                  className="absolute inset-0"
                >
                  <SignIn />
                </motion.div>
              )}
              {isSignUp && (
                <motion.div
                  key="sign-up"
                  initial={{ opacity: 0, y: 50, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.98 }}
                  transition={{
                    y: { duration: 0.2, ease: "easeOut" },
                    scale: { duration: 0.2, ease: "easeOut" },
                    opacity: { duration: 0.2, ease: "easeOut", delay: 0.05 },
                  }}
                  className="absolute inset-0"
                >
                  <SignUp />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NEW: Continue as guest button (ispod formi) */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full cursor-pointer h-10 rounded-md bg-white/80 text-gray-700 text-sm font-medium hover:bg-white hover:text-orange-600 border border-white/70 shadow-sm backdrop-blur-sm transition"
          >
            Continue as Guest
          </button>

          <p className="mt-6 text-center text-[10px] tracking-wide text-white/50">
            © {new Date().getFullYear()} Recipe Hub
          </p>
        </div>
      </div>
    </div>
  );
}
