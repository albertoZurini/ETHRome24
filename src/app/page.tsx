"use client"

import { SessionProvider } from 'next-auth/react';
import GoogleLoginButton from './components/GoogleLoginButton';

import Head from "next/head";
import NfcReader from "./components/NFCReader";

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
          <NfcReader />
          <GoogleLoginButton /> {/* Add your Google Login Button here */}
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;