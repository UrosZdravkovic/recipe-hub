import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, "Email required").email("Invalid email"),
  password: z.string().min(6, "Min 6 chars"),
});

type SignInFormValues = z.infer<typeof schema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { login, user, profile } = useAuth();
  const waitingForProfile = !!user && !profile; // user stigao, profil još ne
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  // Zadržiš postojeći onSubmit (bez izmene)...
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      const loggedInUser = await login({ email: data.email, password: data.password });
      // Odmah možeš pristupiti auth user objektu (iz rezultata thunka), profil stiže kroz fetchProfileThunk
      console.log("Logged in user (auth object):", loggedInUser?.id);
      // Nemoj odmah koristiti profile!.id jer se profil još uvek učitava asinkrono
    } catch (error: any) {
      setError("email", { message: "Invalid email or password" });
    }
  };

  // Navigacija tek kada profil stigne (ako je to bitno za dalje ekrane)
  useEffect(() => {
    if (user && profile) {
      navigate("/");
    }
  }, [user, profile, navigate]);


 
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-sm w-full bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md border border-orange-100"
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">Sign in</h2>
        <p className="text-xs text-gray-500">
          Access your recipes and favourites.
        </p>
      </div>

      {(errors.email || errors.password) && (
        <div className="space-y-1 rounded-md border border-red-300 bg-red-50 px-3 py-2">
          {errors.email?.message && (
            <p className="text-xs text-red-600 leading-relaxed">
              {errors.email.message}
            </p>
          )}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative">
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full h-11 px-3 rounded-md border text-sm outline-none transition ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            } bg-white`}
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full h-11 pr-10 px-3 rounded-md border text-sm outline-none transition ${
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            } bg-white`}
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded cursor-pointer select-none focus:outline-none focus-visible:ring-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            tabIndex={0}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || waitingForProfile}
        className="w-full h-11 rounded-md bg-orange-500 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition shadow-sm"
      >
        {(isSubmitting || waitingForProfile) ? "Processing..." : "Sign In"}
      </button>

      <p className="text-[11px] text-center text-gray-400">
        Need an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/auth/sign-up")}
          className="text-orange-600 hover:underline font-medium cursor-pointer"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}