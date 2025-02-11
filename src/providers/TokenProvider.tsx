"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const checkTokenValidity = () => {
      if (session?.user?.token) {
        const decodedToken = jwtDecode<DecodedToken>(session.user.token);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
          signOut();
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(interval);
  }, [session]);

  return <>{children}</>;
};

export default TokenProvider;
