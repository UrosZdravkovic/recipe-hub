import SignUp from "@/components/custom/authorization/SignUp";
import bgImage from "@/assets/images/backgrond.jpg"; // prilagodi naziv fajla

export default function Auth() {
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <SignUp />
      </div>
    </div>
  );
}