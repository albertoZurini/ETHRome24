"use client";
import LoginGuard from "@/components/LoginGuard";

import NfcReader from "@/components/NFCReader";
import Head from "next/head";

export default function Home() {
  return (
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
      </main>
    </div>
  );
}