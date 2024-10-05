"use client";
import CommentsTextBox from "@/components/CommentsTextBox";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LoginGuard from "@/components/LoginGuard";
import NfcReader from "@/components/NFCReader";
import { SessionProvider, useSession } from "next-auth/react";
import crypto from "crypto";

const Home: React.FC = () => {
  // Use React.FC to define the component type
  const { data: session } = useSession(); // Get session (with user email)
  // const { data: session } = useSession({ required: true }); // Require session
  const uid = crypto.randomBytes(16).toString("hex");

  function sendComment(content: string) {
    const comment = {
      content: content,
      email: session?.user?.email,
      uid: uid,
    };
    console.log(comment);

    return comment;
  }
  return (
    <SessionProvider>
      <div className="flex flex-col h-screen justify-center mx-auto ">
        <main className="mx-auto space-y-5">
          <LoginGuard>
            <SessionProvider>
              <GoogleLoginButton />
              <NfcReader />
              <CommentsTextBox
                submit={(content) => {
                  sendComment(content);
                }}
              />
            </SessionProvider>
          </LoginGuard>
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;
