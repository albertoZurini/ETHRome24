"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LoginGuard from "@/components/LoginGuard";

import NfcReader from "@/components/NFCReader";

import { SessionProvider } from 'next-auth/react';

import Head from "next/head";

const Home: React.FC = () => { // Use React.FC to define the component type
  return (
    <SessionProvider>
      <div>
        <Head>
          <title>NFC Reader Test</title>
          <meta name="description" content="Test NFC Reader functionality" />
        </Head>
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h1>NFC Reader Test Page</h1>
          <LoginGuard>
            <NfcReader />
          </LoginGuard>
          <GoogleLoginButton />
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;