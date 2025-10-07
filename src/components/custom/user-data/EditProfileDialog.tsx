import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import EditEmailForm from "./EditEmailForm";
import { EditUsernameForm } from "./EditUsernameForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function EditProfileDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>

                <button
                    className="h-9 px-2 cursor-pointer text-xs flex gap-1 items-center justify-center rounded-lg bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition"
                >
                    <Edit size={16} />
                    <p className="max-[400px]:hidden">Edit Profile</p>
                </button>

            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden sm:max-w-[540px]">
                {/* Header with top close */}
                <div className="px-5 py-4 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                    <DialogTitle className="text-base font-semibold">Edit your profile</DialogTitle>
                    <DialogDescription className="text-xs mt-1 text-gray-500">
                        Update your account information below.
                    </DialogDescription>
                </div>

                {/* Scrollable body */}
                <div className="max-h-[60vh] overflow-y-auto px-5 py-5 space-y-8">
                    <div className="space-y-6">
                        <EditEmailForm />
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
                        <EditUsernameForm />
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
                        <ChangePasswordForm />
                    </div>
                </div>

                {/* Footer with bottom close */}
                <div className="px-5 py-3 border-t bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex justify-end gap-2">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="h-9 px-4 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                        >
                            Close
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}