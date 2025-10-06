import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { Check } from "lucide-react";

// Removed cooldown – immediate consecutive changes allowed.

const schema = z.object({
  newPassword: z.string().min(8, "Min 8 chars"),
  confirmPassword: z.string().min(8, "Repeat new password"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface ChangePasswordValues extends z.infer<typeof schema> {}

export default function ChangePasswordForm() {
  const { updatePassword, user, logout } = useAuth();
  const [success, setSuccess] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  console.log(user);
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, dirtyFields }, reset, setError } = useForm<ChangePasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const onSubmit = async (values: ChangePasswordValues) => {
    try {
      // For Supabase password change we only need new password (current validation handled client-side)
  await updatePassword(values.newPassword);
  setSuccess(true);
  setTimeout(() => setSuccess(false), 2000);
  // Odjavljujemo korisnika nakon promene lozinke radi sigurnosti
  setTimeout(() => logout(), 1800);
  reset({ newPassword: '', confirmPassword: '' }, { keepDirty: false });
    } catch (err: any) {
      setError('newPassword', { type: 'server', message: err?.message || 'Failed to update password' });
    }
  };
  const disableSave = isSubmitting || !isValid || !dirtyFields.newPassword || !dirtyFields.confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="group relative space-y-6">
      <div className="rounded-lg border border-orange-100 bg-orange-50/30 px-4 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="block text-sm font-semibold text-gray-700 tracking-tight">Change Password</span>
          <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Security</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-3">Use a strong unique password (min 8 characters).</p>
        <div className="space-y-4">
          {/* current password removed by request */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="newPassword">New Password</label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                {...register('newPassword')}
                className="w-full h-11 px-3 pr-14 rounded-md border border-orange-200 bg-white text-sm outline-none shadow-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={errors.newPassword ? true : false}
              />
              <button
                type="button"
                onClick={() => setShowNew(s => !s)}
                className="absolute inset-y-0 right-2 flex items-center text-[11px] font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showNew ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <div className="min-h-[16px] mt-1">
              {errors.newPassword && <p className="text-xs font-medium text-red-500">{errors.newPassword.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="w-full h-11 px-3 pr-14 rounded-md border border-orange-200 bg-white text-sm outline-none shadow-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={errors.confirmPassword ? true : false}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(s => !s)}
                className="absolute inset-y-0 right-2 flex items-center text-[11px] font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showConfirm ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <div className="min-h-[16px] mt-1">
              {errors.confirmPassword && <p className="text-xs font-medium text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={disableSave}
              className="h-11 px-6 rounded-md bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white text-sm font-medium hover:bg-orange-600 disabled:hover:bg-orange-300 active:scale-[.98] transition-all duration-150 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              {success ? <Check size={16} /> : isSubmitting ? <span className="animate-pulse">Saving...</span> : 'Save'}
            </button>
          </div>
          <div className="min-h-[32px] mt-2 text-xs">
            {success && (
              <p className="text-green-600 leading-relaxed">Password updated. You will be logged out for security.</p>
            )}
            {!success && (
              <p className="text-gray-400 leading-relaxed">After changing your password, active sessions may be invalidated.</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
    </form>
  );
}
