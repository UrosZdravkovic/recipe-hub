import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/useAuth";

type EditUsernameFormValues = {
    username: string;
};





export const EditUsernameForm = () => {
    const { profile, user, updateUsername } = useAuth();

    const schema = z.object({
        username: z.string().min(3, "Min 3 chars").max(20, "Max 20 chars"),
    }).refine((data) => data.username !== profile?.username, {
        message: "Username is unchanged",
        path: ["username"],
    });

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid, dirtyFields }, watch, setError } = useForm<EditUsernameFormValues>({
        resolver: zodResolver(schema),
        defaultValues: { username: profile?.username || "" },
        mode: "onChange"
    });

    const currentUsername = profile?.username;
    const entered = watch("username");
    const unchanged = entered === currentUsername;

    const onSubmit: SubmitHandler<EditUsernameFormValues> = async (data) => {
        // samo log za sada – bez funkcionalnosti
        if (unchanged) {
            setError("username", { type: "manual", message: "Username is unchanged" });
            return;
        }
        try {
            await updateUsername(data.username, user.id);
            console.log("New username to save:", data.username);
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };
    const disableSave = !isValid || isSubmitting || unchanged || !dirtyFields.username;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="group relative space-y-6" noValidate>
            <div className="rounded-lg border border-orange-100 bg-orange-50/30 px-4 py-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 tracking-tight">
                        Username
                    </label>
                    <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Profile</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-3">This is your public display name (3–20 characters).</p>
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            className="w-full h-11 px-3 rounded-md border border-orange-200 bg-white text-sm outline-none shadow-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40"
                            placeholder="your username"
                            aria-invalid={errors.username ? true : false}
                            aria-describedby={errors.username ? "username-status" : undefined}
                            autoComplete="username"
                        />
                        <div className="min-h-[18px] mt-2">
                            {errors.username && (
                                <p id="username-status" className="text-xs font-medium text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                            {!errors.username && unchanged && (
                                <p id="username-status" className="text-xs text-orange-500">Username unchanged.</p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={disableSave}
                        className="h-11 px-5 rounded-md bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white text-sm font-medium hover:bg-orange-600 disabled:hover:bg-orange-300 active:scale-[.98] transition-all duration-150 shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        {isSubmitting ? <span className="animate-pulse">Saving...</span> : "Save"}
                    </button>
                </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
        </form>
    );
};