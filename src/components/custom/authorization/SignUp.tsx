import { useForm } from "react-hook-form";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router-dom";


type SignUpFormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, dirtyFields }
  } = useForm<SignUpFormValues>({
    mode: "onSubmit",        // Validacija (greške) tek na submit
    reValidateMode: "onSubmit",
    defaultValues: { email: "", username: "", password: "", confirmPassword: "" }
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Real‑time samo za match password-a (pre submit-a)
  const showLiveMismatch =
    !isSubmitted &&
    dirtyFields.confirmPassword &&
    confirmPassword.length > 0 &&
    confirmPassword !== password;

  async function onSubmit(values: SignUpFormValues) {
    try {
      await signup({
        email: values.email,
        password: values.password,
        username: values.username
      });
      navigate("/");

       // Uspešan signup, preusmeri na home
    } catch (error) {
      console.error("Signup error:", error);
      // Ovde možeš dodati prikaz greške korisniku ako želiš
    }
  }

  function fieldError(name: keyof SignUpFormValues) {
    return isSubmitted && errors[name]?.message;
  }

  function inputClasses(name: keyof SignUpFormValues) {
    if (fieldError(name)) return "border-red-400 focus:border-red-500";
    // Ako je confirmPassword u toku i NE POKLAPA se (pre submit-a) oboji crveno
    if (name === "confirmPassword" && showLiveMismatch) return "border-red-400 focus:border-red-500";
    // Ako je confirmPassword dirnut i poklapa se (pre ili posle submit-a) oboji zeleno
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
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email"
            }
          })}
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
          {...register("username", {
            required: "Username required",
            minLength: { value: 3, message: "Min 3 chars" },
            maxLength: { value: 24, message: "Max 24 chars" },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Only letters, numbers, _"
            }
          })}
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
          {...register("password", {
            required: "Password required",
            minLength: { value: 6, message: "Min 6 chars" },
            validate: {
              strength: v =>
                /[A-Z]/.test(v) && /[0-9]/.test(v)
                  ? true
                  : "Add a number & capital letter"
            }
          })}
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
          {...register("confirmPassword", {
            required: "Confirm password",
            validate: v => v === password || "Passwords do not match"
          })}
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