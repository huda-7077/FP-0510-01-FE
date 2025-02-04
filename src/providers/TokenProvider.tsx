"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const checkSessionValidity = () => {
      if (session?.expires) {
        const expiryTime = new Date(session.expires).getTime();
        const currentTime = new Date().getTime();

        if (currentTime >= expiryTime) {
          signOut();
        }
      }
    };

    const interval = setInterval(checkSessionValidity, 15000);
    return () => clearInterval(interval);
  }, [session]);

  return <>{children}</>;
};

export default TokenProvider;
