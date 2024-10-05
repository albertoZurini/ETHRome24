"use client";

import { useState } from "react";

export default function CommentsTextBox({
  submit,
}: {
  submit: (content: string) => void;
}) {
  const [content, setContent] = useState<string>("");

  return (
    <div className="mx-auto space-y-5">
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded-lg"
        placeholder="Enter your comments here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="btn btn-link" onClick={() => submit(content)}>Submit</button>
    </div>
  );
}
