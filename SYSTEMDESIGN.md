# Steps involved in the protocol

1. Read NFC ID and get user email from Google Account
2. Call iExec to get the hash of the email
3. Use email hash, message and NFC ID to compose a ZK proof and send it to the backend
4. Wait for somebody to answer the message and bind the reply to the ZK proof and store this in a database
5. Use iExec email notification service to send a notification email
6. Wait for the user to open the app, log in to Google and NFC and compose the ZK proof (we can find an easier way to do the same thing ---> how?)
7. Query the database using the ZK proof and display the reply on screen


Possible problems:
- How do the users log in if they don't have the NFC part?
- What if we used FHE to keep the messages on-chain and allow only the specific user to retrieve the response?
- Why don't we use ENS as auth? (check if the owner of the account corresponds)




!!! account abstraction !!!