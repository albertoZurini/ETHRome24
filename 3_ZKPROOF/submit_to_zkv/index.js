const zk = require("zkverifyjs")
const {SEED} = require("./conf")
const fs = require('fs');
const ethers = require("ethers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

function toBytes32Array(data) {
    const bytes32Array = [];
    for (let i = 0; i < data.length; i += 1) {
        const chunk = data[i];  // Get a chunk of 32 bytes
        const paddedChunk = ethers.utils.hexZeroPad(chunk, 32);  // Pad to 32 bytes if necessary
        bytes32Array.push(paddedChunk);
    }
    return bytes32Array;
}


async function main() {
    const proof = fs.readFileSync("../noir_proj/target/proof").toString('hex');
    const publicInput = "Hello, today there were no problems with your servicea3     ";
    console.log(stringToHexByteArray(publicInput))
    
    
    // Convert to bytes and then to hex
    const publicInputHex = ethers.utils.toUtf8Bytes(publicInput);
    const publicInputArray = publicInputHex //.map(byte => `0x${byte.toString(16).padStart(2, '0')}`);

    // Log the proof and public input array for debugging
    console.log("Proof:", proof);
    console.log("Public Input Array:", publicInputArray);

    const contractAddress = "0xFB318f4dAd1CA0264FCcE364eb41eA928dEef41C";

    const artifactPath = path.resolve(__dirname, '../deploy_contract/artifacts/contracts/contract.sol/UltraVerifier.json');
    const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const contractABI = contractArtifact.abi;

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    try {
        const result = await contract.verify("0x" + proof, toBytes32Array(publicInputArray));
        console.log("Method Result:", result);
    } catch (error) {
        console.error("Error calling method:", error);
    }
}
    
main()