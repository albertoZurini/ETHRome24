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
      setNfcResult('Web NFC is not (yet) supported in this browser. Please use Chrome for Android');
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

        (window as any).processFunction()
      };
    } catch (error: any) {
      setNfcResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className='mx-auto space-y-5'>
      <button className="btn btn-primary btn-wide text-white" onClick={handleNfcScan}>Read NFC Tag</button>
      <p className='text-red-600 text-2xl font-bold'>{nfcResult}</p>
    </div>
  );
};

export default NfcReader;
