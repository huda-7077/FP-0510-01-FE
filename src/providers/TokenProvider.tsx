"use client";

import { jwtDecode } from "jwt-decode";
import { getSession, signOut } from "next-auth/react";
import { FC, PropsWithChildren, useEffect } from "react";

interface DecodedToken {
  exp: number;
}

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const checkTokenValidity = async () => {
      const session = await getSession();

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
  }, []);

  return <>{children}</>;
};

export default TokenProvider;
