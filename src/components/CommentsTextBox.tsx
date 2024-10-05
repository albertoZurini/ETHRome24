"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import crypto from "crypto";

export default function CommentsTextBox() {
  const [content, setContent] = useState<string>("");

  const { data: session } = useSession(); // Get session (with user email)
  // const { data: session } = useSession({ required: true }); // Require session
  const uid = crypto.randomBytes(16).toString("hex");

  function sendComment(content: string) {
    const comment = {
      content: content,
      email: session?.user?.email,
      uid: uid,
    };

    // alert("Comment submitted: " + JSON.stringify(comment));

    return comment;
  }
  return (
    <div className="mx-auto space-y-5">
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded-lg"
        placeholder="Enter your comments here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="btn btn-link" onClick={() => sendComment(content)}>
        Submit
      </button>
    </div>
  );
}
