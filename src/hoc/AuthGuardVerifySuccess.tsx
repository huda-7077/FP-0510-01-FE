import { RootState } from "@/redux/store";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function VerifySuccessGuard(Component: any) {
  return function IsVerifying(props: any) {
    const router = useTransitionRouter();
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
