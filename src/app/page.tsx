"use client";
import Comments from "@/components/Comments";
import CommentsTextBox from "@/components/CommentsTextBox";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LoginGuard from "@/components/LoginGuard";
import NfcReader from "@/components/NFCReader";
import { SessionProvider, useSession } from "next-auth/react";

const Home: React.FC = () => {
  // Use React.FC to define the component type
  return (
    <SessionProvider>
      <div className="flex flex-col h-screen justify-center mx-auto ">
        <main className="mx-auto space-y-5">
          <LoginGuard>
            <SessionProvider>
              <GoogleLoginButton />
              <NfcReader />
              <CommentsTextBox />
              <Comments />
            </SessionProvider>
          </LoginGuard>
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;
