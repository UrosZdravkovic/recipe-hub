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
import { Settings } from "lucide-react";
import EditEmailForm from "./EditEmailForm";

export default function EditProfileDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="h-9 px-2 cursor-pointer text-xs flex items-center justify-center rounded-lg bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition"
                >
                    <Settings size={16} />
                    Settings
                </button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile information.
                    </DialogDescription>
                </DialogHeader>
                <div> 
                    <EditEmailForm />
                </div>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}