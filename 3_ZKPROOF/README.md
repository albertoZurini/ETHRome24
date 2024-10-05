# Commands to execute

## Inside `noir_proj` folder
1. [https://noir-lang.org/docs/getting_started/hello_noir/](https://noir-lang.org/docs/getting_started/hello_noir/)

`nargo check`

`nargo execute king`

`bb prove -b ./target/noir_proj.json -w ./target/king.gz -o ./target/proof`

`bb write_vk -b ./target/noir_proj.json -o ./target/vk`

`bb verify -k ./target/vk -p ./target/proof`

Generate the contract
`bb contract`

Use the `verify` method passing in the hex of the proof and the public input

## Inside `deploy_contract` folder

Do the deployment with hardat