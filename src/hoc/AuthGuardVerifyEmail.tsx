import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailGuard(Component: any) {
  return function IsVerifying(props: any) {
    const router = useTransitionRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
