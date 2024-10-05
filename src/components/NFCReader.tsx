"use client"

import { useState, useEffect } from 'react';

const NfcReader: React.FC = () => {
  const [nfcResult, setNfcResult] = useState<string>('');
  const [isNfcSupported, setIsNfcSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check for NFC support
    if ('NDEFReader' in window) {
      setIsNfcSupported(true);
    } else {
      setNfcResult('Web NFC is not supported in this browser.');
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleNfcScan = async (): Promise<void> => {
    if (!isNfcSupported) return;

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      setNfcResult('NFC scan started...');

      ndef.onreading = (event: any) => {
        const serialNumber = event.serialNumber;
        setNfcResult(`NFC Tag Serial Number: ${serialNumber}`);
      };
    } catch (error: any) {
      setNfcResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>NFC Reader Demo</h1>
      <button onClick={handleNfcScan}>Read NFC Tag</button>
      <p>{nfcResult}</p>
    </div>
  );
};

export default NfcReader;
