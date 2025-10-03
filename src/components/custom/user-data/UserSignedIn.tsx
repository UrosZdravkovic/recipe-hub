import { LogOut, UserRound, Settings, Edit } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // prilagodi putanju ako je drugačija
import EditProfileDialog from "./EditProfileDialog";

export default function UserSignedIn() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    try {
      await logout();
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-orange-50 pt-1 pb-3 mb-3 border-b border-orange-100">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-white shadow-sm border border-orange-100 flex items-center justify-center text-orange-600">
            <UserRound size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {profile?.username || "User"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <EditProfileDialog />
            <PopoverTrigger asChild>
              <button
                type="button"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="w-60 p-4 space-y-3"
            >
              <p className="text-sm font-medium text-gray-800">Sign out?</p>
              <p className="text-xs text-gray-500">
                Are you sure you want to logout?
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSignOut}
                  className="flex-1 h-8 text-xs font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 h-8 text-xs font-medium rounded-md border border-orange-200 bg-white text-orange-700 hover:bg-orange-50 transition"
                >
                  No
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
