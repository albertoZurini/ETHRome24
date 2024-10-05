"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton: React.FC = () => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      {!session ? (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
