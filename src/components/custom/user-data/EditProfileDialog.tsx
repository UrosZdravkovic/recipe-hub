import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile information.
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-scroll max-h-[80vh]">
                    <EditEmailForm />
                    <EditUsernameForm />
                    <ChangePasswordForm />
                </div>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}