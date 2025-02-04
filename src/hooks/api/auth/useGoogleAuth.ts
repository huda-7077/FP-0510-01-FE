import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const useGoogleAuth = () => {
  const login = async () => {
    try {
      const lastPath = localStorage.getItem("lastPath") || "/";
      console.log("Last path from localStorage:", lastPath); // Debugging

      const result = await signIn("google", {
        redirect: false,
        callbackUrl: lastPath,
      });

      if (result?.error) {
        toast.error("Google login failed");
        return;
      }

      if (result?.ok) {
        console.log("Redirecting to:", lastPath); // Debugging
        window.location.href = lastPath; // Use window.location.href for redirection
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed");
    }
  };

  return { login };
};
