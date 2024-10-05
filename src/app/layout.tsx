import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import NextAuth from "../api/auth/[...nextauth]";
import SessionProviderWrapper from "../app/components/SessionProviderWrapper";
interface LayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  // Fetch the session data on the server
  const session = await getServerSession(NextAuth);

  return (
    <html lang="en">
      <body>
        {/* Use the client component to wrap the session provider */}
        <SessionProviderWrapper session={session}>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}