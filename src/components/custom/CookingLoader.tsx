import Lottie from "lottie-react";
import loaderPan from "@/assets/animations/loaderPan.json";

export default function CookingLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie animationData={loaderPan} loop={true} className="w-64 h-64" />
    </div>
  );
}