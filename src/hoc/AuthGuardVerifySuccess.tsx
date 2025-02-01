import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifySuccessGuard(Component: any) {
  return function IsVerifying(props: any) {
    const router = useRouter();
    const isVerificationSuccess = useSelector(
      (state: RootState) => state.verification.isVerificationSuccess,
    );

    useEffect(() => {
      if (!isVerificationSuccess) {
        router.push("/login");
      }
    }, [isVerificationSuccess, router]);

    if (!isVerificationSuccess) {
      return null;
    }

    return <Component {...props} />;
  };
}
