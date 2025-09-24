import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema sa Zod
const schema = z
  .object({
    email: z
      .string()
      .min(1, "Email required")
      .email("Invalid email"),
    username: z
      .string()
      .min(3, "Min 3 chars")
      .max(24, "Max 24 chars")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, _"),
    password: z
      .string()
      .min(6, "Min 6 chars")
      .refine((v) => /[A-Z]/.test(v) && /[0-9]/.test(v), {
        message: "Add a number & capital letter",
      }),
    confirmPassword: z.string().min(1, "Confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof schema>;

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isSubmitted, dirtyFields },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", username: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const showLiveMismatch =
    !isSubmitted &&
    dirtyFields.confirmPassword &&
    confirmPassword.length > 0 &&
    confirmPassword !== password;

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await signup({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      navigate("/");
    } catch (error: any) {
      if(error.message === "User already registered") {
        setError("email", { message: "Email already registered" });
      } else if (error.message === "Username is already taken") {
        setError("username", { message: "Username is already taken" });
      }
        
    }
  };

  function fieldError(name: keyof SignUpFormValues) {
    return isSubmitted && errors[name]?.message;
  }

  function inputClasses(name: keyof SignUpFormValues) {
    if (fieldError(name)) return "border-red-400 focus:border-red-500";
    if (name === "confirmPassword" && showLiveMismatch)
      return "border-red-400 focus:border-red-500";
    if (
      name === "confirmPassword" &&
      dirtyFields.confirmPassword &&
      confirmPassword.length > 0 &&
      confirmPassword === password &&
      !errors.confirmPassword
    ) {
      return "border-green-500 focus:border-green-500";
    }
    return "border-gray-300 focus:border-orange-500";
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm w-full bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800">Create account</h2>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className={`w-full h-11 px-3 rounded-md border text-sm outline-none transition ${inputClasses("email")}`}
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={!!fieldError("email")}
        />
        {fieldError("email") && (
          <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          className={`w-full h-11 px-3 rounded-md border text-sm outline-none transition ${inputClasses("username")}`}
          placeholder="Username"
          {...register("username")}
          aria-invalid={!!fieldError("username")}
        />
        {fieldError("username") && (
          <p className="text-xs text-red-500 mt-1">{errors.username?.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className={`w-full h-11 px-3 rounded-md border text-sm outline-none transition ${inputClasses("password")}`}
          placeholder="••••••••"
          {...register("password")}
          aria-invalid={!!fieldError("password")}
        />
        {fieldError("password") && (
          <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Repeat password</label>
        <input
          type="password"
          className={`w-full h-11 px-3 rounded-md border text-sm outline-none transition ${inputClasses("confirmPassword")}`}
          placeholder="Repeat password"
          {...register("confirmPassword")}
          aria-invalid={!!fieldError("confirmPassword") || showLiveMismatch}
        />
        {fieldError("confirmPassword") && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword?.message}
          </p>
        )}
        {!fieldError("confirmPassword") && showLiveMismatch && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
        {!fieldError("confirmPassword") &&
          !showLiveMismatch &&
          dirtyFields.confirmPassword &&
          confirmPassword.length > 0 &&
          confirmPassword === password && (
            <p className="text-xs text-green-600 mt-1">Passwords match</p>
          )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-md bg-orange-500 text-white text-sm font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition"
      >
        {isSubmitting ? "Processing..." : "Sign Up"}
      </button>
    </form>
  );
}
