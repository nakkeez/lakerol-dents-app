"use client";

import React from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

/**
 * Provider that wraps the application and provides authentication state.
 *
 * @param session The session object
 * @param children The children of the provider
 * @returns The authentication provider
 */
export default function AuthProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
