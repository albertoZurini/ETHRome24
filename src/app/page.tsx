"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LoginGuard from "@/components/LoginGuard";

import NfcReader from "@/components/NFCReader";

import { SessionProvider } from 'next-auth/react';

import Head from "next/head";

const Home: React.FC = () => { // Use React.FC to define the component type
  return (
    <SessionProvider>
      <div className="flex flex-col h-screen justify-center mx-auto ">
        <main className="mx-auto space-y-5">
          <LoginGuard>
          <GoogleLoginButton />
            <NfcReader />
          </LoginGuard>
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;