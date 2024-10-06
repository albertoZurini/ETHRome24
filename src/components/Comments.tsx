"use client";

import { getDataProtectorClient } from "@/utils/externals/dataProtectorClient";
import { getWeb3mailClient } from "@/utils/externals/web3mailClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { P } from "pino";
import { useEffect, useState } from "react";
import internal from "stream";
import { useAccount } from "wagmi";

const Comments: React.FC = () => {
    // Use React.FC to define the component type
    const [requests, setRequests] = useState([])
    const [messages, setMessages] = useState([])
    const [protectedDataAddress, setProtectedDataAddress] = useState("0xc606363ea80243457358221a3500410485c2cce6")

    const { address } = useAccount();

    const {
        isLoading,
        isError,
        error,
        data: grantedAccessResponse,
    } = useQuery({
        queryKey: ['grantedAccess', "protectedDataAddress"],
        queryFn: async () => {
            const { dataProtector } = await getDataProtectorClient();
            return dataProtector.getGrantedAccess({
                protectedData: protectedDataAddress,
            });
            // In case of error, logs and rollbar alert handled by tanstack query config in main.tsx
        },
    });


    useEffect(() => {
        async function process() {
            const response = await fetch("/api/retrieveRequests", {
                method: "GET"
            }
            )
            const json = await response.json();
            console.log(json)
            setRequests(json)
        }

        process()
    }, [])

    const sendEmailMutation = useMutation({
        mutationKey: ["sendEmail"],
        mutationFn: async ({
            message,
            protectedDataAddress,
        }: {
            message: string;
            protectedDataAddress: string;
        }) => {
            const { web3mail } = await getWeb3mailClient();
            return web3mail.sendEmail({
                senderName: "Yes, ZKing",
                contentType: "text/plain",
                emailSubject: "New feedback on ZKing",
                emailContent: `You have new feedback on ${message}`,
                protectedData: protectedDataAddress!,
                workerpoolAddressOrEns: "prod-v8-learn.main.pools.iexec.eth",
            });
        },
        onSuccess: () => {
            console.log("Email sent");
        },
        onError: (err) => {
            console.error(err);
        },
    });
    async function sendReply(i: number, id: number) {

        const hasAccess = grantedAccessResponse?.grantedAccess.some(
            (access: any) => access.requesterrestrict.toLowerCase() === address?.toLowerCase()
        );
        if (!hasAccess) {
            alert("You do not have access to submit a reply.");
            return;
        }
        else {
            sendEmailMutation.mutate({ message: requests[i], protectedDataAddress });
            console.log("You have access to submit a reply.");
        }

        let body = {
            id: id,
            content: messages[i]
        }

        const response = await fetch("/api/submitReply", {
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
                                        let msg: any = messages
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

export default Comments;
