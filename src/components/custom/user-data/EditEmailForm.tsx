import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";

export default function EditEmailForm() {
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement email update logic
    };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 h-11 px-3 rounded-md border border-orange-200 bg-white text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            placeholder="you@example.com"
                        />
                        <button
                            type="submit"
                            className="h-11 px-5 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 active:scale-[.98] transition shadow-sm whitespace-nowrap"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
}
