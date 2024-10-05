"use client";

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDataProtectorClient, initDataProtectorSDK } from '@/utils/externals/dataProtectorClient';
import { useUserStore } from '@/utils/user.store';
import Link from 'next/link';

const GoogleLoginButton: React.FC = () => {
  const { data: session } = useSession(); // Get session (with user email)
  const [error, setError] = useState<string | null>(null);
  const { connector } = useUserStore();
  const [showBackToListLink, setShowBackToListLink] = useState(false);
  const queryClient = useQueryClient();

  // Sign in with Google
  const handleSignIn = async () => {
    setError(null);
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      setError(result.error);
    }
  };

  // Mutation to protect data (send user email and retrieve the hash)
  const createProtectedDataMutation = useMutation({
    mutationKey: ['protectData'],
    mutationFn: async ({
      name,
      data,
    }: {
      name: string;
      data: { email?: string; file?: Uint8Array };
    }) => {
      await initDataProtectorSDK({ connector });
      const { dataProtector } = await getDataProtectorClient();
      return dataProtector.protectData({ name, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProtectedData'] });
      setTimeout(() => {
        setShowBackToListLink(true);
      }, 1500);
    },
    onError: (error) => {
      console.log(error)
      setError('Failed to protect data');
    },
  });

  // Handle Submit
  const handleSubmit = async () => {
    if (!session?.user?.email) {
      setError('No user email available');
      return;
    }

    // Call the mutation with user email
    createProtectedDataMutation.mutate({
      name: 'User Email Data',
      data: {
        email: session.user.email,
      },
    });
  };

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSubmit}>Submit Protected Web3Mail</button>
          </div>

          {/* Display success or error */}
          {createProtectedDataMutation.data &&
            !createProtectedDataMutation.error && (
              <>
                <div className="my-6 flex flex-col items-center">
                  <a
                    href={`https://explorer.iex.ec/bellecour/dataset/${createProtectedDataMutation.data.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline"
                  >
                    See Details
                  </a>
                  <p className="text-sm">
                    Your protected data address:{' '}
                    {createProtectedDataMutation.data.address}
                  </p>
                </div>
              </>
            )}
        </>
      ) : (
        <>
          <button onClick={handleSignIn}>Sign in with Google</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default GoogleLoginButton;
