import {createBrowserRouter, RouterProvider} from "react-router-dom"
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

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}


