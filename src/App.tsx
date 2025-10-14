import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Home from './pages/Home'
import AuthLayout from "./pages/Auth"
import SignUp from "./components/custom/authorization/SignUp"
import SignIn from "./components/custom/authorization/SignIn"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,           // /auth -> default (optional)
        element: <SignUp />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "sign-up",
        element: <SignUp />
      }
    ]
  },
  {
    path: "*",
    element: <div className="p-6">Not found</div>
  }
]);

function AuthRehydrationGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(() => { if (active) setChecked(true); });
    return () => { active = false; };
  }, []);

  if (!checked) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-sm text-gray-500">
        <div className="animate-pulse">Loading…</div>
      </div>
    );
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthRehydrationGate>
      <RouterProvider router={router} />
    </AuthRehydrationGate>
  )
}


