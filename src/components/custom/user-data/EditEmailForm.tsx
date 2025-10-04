import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import { Check } from "lucide-react"; // ikonice

type EditEmailFormValues = {
  email: string;
};

export default function EditEmailForm() {
  const { user, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ novo stanje

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
    formState: { errors },
  } = useForm<EditEmailFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: user?.email || "" },
  });

  const onSubmit: SubmitHandler<EditEmailFormValues> = async (data) => {
    if (loading) return; // sprečava dupli klik
    setLoading(true);
    try {
      await updateEmail(data.email);
      setSuccess(true); // prikaži checkmark
      // posle 2 sekunde vrati dugme u normalno stanje
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            {...register("email")}
            className="flex-1 h-11 px-3 rounded-md border border-orange-200 bg-white text-sm outline-none transition focus:border-orange-500"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-5 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60 active:scale-[.98] transition shadow-sm flex items-center justify-center gap-2"
          >
            {success ? (
              <>
                <Check size={16} />
              </>
            ) : loading ? (
              "Saving..."
            ) : (
              "Save"
            )}
          </button>
        </div>
        {success && <p className="text-green-700 text-sm mt-1">Verification email has been sent, please confirm the change.</p>}
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
    </form>
  );
}

