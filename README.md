# Yes, ZKing

<!-- ![header](https://imgs.xkcd.com/comics/blockchain_2x.png) -->

## Project Description

The main idea behind `Yes, ZKing` is to give the users the possibility to interact with businesses in a free and anonymous way.

We created a platform where users can ask questions to businesses directly with their email, through `iExec` services. 

If the user has a `ENS` preferred name, it can be used to make the interaction even more consistent with the user's identity around the various chains.

## How it's Made

We followed a precise development process to create `Yes, ZKing`:

1. We created a way to read the user's ID card through Web-NFC (which will be used to identify the user in the future and avoid spam).
2. We created a way to interact with the user's email through `iExec` mailing services.
3. We created a ZKP to ensure the user's privacy both in the interaction with the business and in the interaction with the platform.
4. We created the interaction with `ENS`.
5. We designed IPFS to store the user's contributions and the business's (eventual) response.

## How to Use `Yes, ZKing`

With your Android phone, go to the `Yes, ZKing` website and ask a question to a business. 

You will be asked to scan your ID card and you'll be asked to use your gmail address to verify that you are a human. 

Then you can ask your question. The business will receive your question and will be able to answer you directly (*without knowing your identity*).