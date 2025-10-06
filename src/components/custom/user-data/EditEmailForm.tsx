import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type EditEmailFormValues = {
  email: string;
};

const COOLDOWN_TIME = 60_000; // 60 sekundi

export default function EditEmailForm() {
  const { user, updateEmail, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const schema = z
    .object({
      email: z.string().min(1, "Email required").email("Invalid email"),
    })
    .refine((data) => data.email !== user?.email, {
      message: "New email must be different",
      path: ["email"],
    });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, dirtyFields, isValid, isSubmitting },
  } = useForm<EditEmailFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: user?.email || "" },
    mode: "onChange"
  });

  // 🕒 Proveri cooldown nakon reload-a
  useEffect(() => {
    const lastSent = localStorage.getItem("emailUpdateLastSent");
    if (lastSent) {
      const elapsed = Date.now() - parseInt(lastSent);
      if (elapsed < COOLDOWN_TIME) {
        const remaining = Math.ceil((COOLDOWN_TIME - elapsed) / 1000);
        setCooldown(true);
        setRemainingTime(remaining);
      }
    }
  }, []);

  // ⏳ Odbrojavanje dok traje cooldown
  useEffect(() => {
    if (!cooldown) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev && prev > 1) return prev - 1;
        clearInterval(interval);
        setCooldown(false);
        return null;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]); 

  const watched = watch("email");
  const unchanged = watched === user?.email;

  const onSubmit: SubmitHandler<EditEmailFormValues> = async (data) => {
    if (loading || cooldown) return;
    setLoading(true); 
    if (unchanged) {
      setError("email", { type: "manual", message: "New email must be different" });
      setLoading(false);
      return;
    }
    try {
      await updateEmail(data.email);
      setSuccess(true);
      setInfoMessage("Verification email sent. Please confirm via your current inbox. You will be logged out shortly.");
      // Odložen logout da bi korisnik video poruku
      setTimeout(() => {
        logout();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }; 

  const disableSave = loading || cooldown || unchanged || !dirtyFields.email || !isValid || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="group relative space-y-6">
      <div className="rounded-lg border border-orange-100 bg-orange-50/30 px-4 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700 tracking-tight">
            Email
          </label>
          <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Account</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-3">
          We’ll send a verification link to this address if you change it.
        </p>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="email"
              {...register("email")}
              className="w-full h-11 px-3 rounded-md border border-orange-200 bg-white text-sm outline-none shadow-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40"
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : false}
              aria-describedby={errors.email ? "email-status" : undefined}
              autoComplete="email"
            />
            <div className="min-h-[18px] mt-2">
              {errors.email && (
                <p id="email-status" className="text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
              {!errors.email && success && infoMessage && (
                <p id="email-status" className="text-xs text-green-600">
                  {infoMessage}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={disableSave}
            className="h-11 px-5 rounded-md bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white text-sm font-medium hover:bg-orange-600 disabled:hover:bg-orange-300 active:scale-[.98] transition-all duration-150 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {success ? (
              <Check size={16} />
            ) : loading ? (
              <span className="animate-pulse">Saving...</span>
            ) : cooldown && remainingTime !== null ? (
              `Wait (${remainingTime}s)`
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
    </form>
  );
}
