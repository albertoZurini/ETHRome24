"use client";

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const GoogleLoginButton: React.FC = () => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button onClick={handleSignIn}>Sign in with Google</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </>
      )}
    </div>
  );
};

export default GoogleLoginButton;
