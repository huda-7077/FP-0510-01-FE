import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useGoogleAuth = () => {
  const router = useRouter();

  const login = async () => {
    try {
      const lastPath = localStorage.getItem("lastPath") || "/";

      const result = await signIn("google", {
        redirect: false,
        callbackUrl: lastPath,
      });

      if (result?.error) {
        toast.error("Google login failed");
      }

      if (result?.ok) {
        router.push(lastPath);
      }
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

  return { login };
};
