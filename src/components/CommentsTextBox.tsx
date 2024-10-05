"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import crypto from "crypto";

export default function CommentsTextBox() {
  const [content, setContent] = useState<string>(localStorage.getItem("comment") || "");

  const { data: session } = useSession(); // Get session (with user email)
  // const { data: session } = useSession({ required: true }); // Require session
  const uid = crypto.randomBytes(16).toString("hex");

  async function sendComment(content: string) {
    const comment = {
      content: content,
      email: session?.user?.email,
      uid: uid,
    };
    localStorage.setItem("comment", content)

    // alert("Comment submitted: " + JSON.stringify(comment));

    let body = comment
    const response = await fetch("/api/submitMessage",{
        method: "POST",
        body: JSON.stringify(body)
      }
    )
    const json = await response.json();
    console.log(json)
    alert("Request processed successfully!")
  }

  const [reply, setReply] = useState("")
  async function process(){
    let email = null
    email = session?.user?.email
    if(email == null){
      email = "alberto.zurini@gmail.com"
    }

    let body = {
      email: email
    }
    const response = await fetch("/api/retrieveReply",{
      method: "POST",
      body: JSON.stringify(body)
    }
    )
    const json = await response.json();
    setReply(json[0].response)
  }
  const win = (window as any)
  win.processFunction = process

  return (
    <div className="mx-auto space-y-5">
      {reply != "" ? <div>
        <h1>Reply from service owner</h1>
        <p>{reply}</p>
      </div> : ""}
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
