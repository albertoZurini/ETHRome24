"use client";

import { P } from "pino";
import { useEffect, useState } from "react";
import internal from "stream";

const Home: React.FC = () => {
  // Use React.FC to define the component type
  const [requests, setRequests] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function process(){
        const response = await fetch("/api/retrieveRequests",{
            method: "GET"
          }
        )
        const json = await response.json();
        console.log(json)
        setRequests(json)
    }
    
    process()
  }, [])

  async function sendReply(i : number, id: number){
    let body = {
        id: id,
        content: messages[i]
    }
    console.log(body)

    const response = await fetch("/api/submitReply",{
        method: "POST",
        body: JSON.stringify(body)
      }
    )
    alert("Feedback submitted")
  }

  return (
    <div>
        <h1>Management area</h1>
        <table border={1}>
            <tbody>
            {requests.map((el, i) => 
            <tr key={i}>
                <td>{(el as any).comment}</td>
                <td>
                    <input
                        value={messages[i]}
                        onChange={e => {
                            let msg : any = messages
                            msg[i] = e.target.value
                            setMessages(msg)
                        }}
                    />
                </td>
                <td>
                    <button
                    onClick={() => {
                        sendReply(i, (el as any).id)
                    }}
                    >
                        Submit Answer
                    </button>
                </td>
            </tr>
            )}
            </tbody>
        </table>
    </div>
  );
};

export default Home;
