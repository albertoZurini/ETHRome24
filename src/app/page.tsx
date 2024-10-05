import Head from "next/head";
import NfcReader from "./components/NFCReader";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFC Reader Test</title>
        <meta name="description" content="Test NFC Reader functionality" />
      </Head>
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>NFC Reader Test Page</h1>
        <NfcReader />
      </main>
    </div>
  );
}