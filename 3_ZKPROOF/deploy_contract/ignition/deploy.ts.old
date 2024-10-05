import { ignition } from "hardhat";
import UltraVerifierModule from "./modules/contract";

async function main() {
  const deployment = await ignition.deploy(UltraVerifierModule);
  console.log("Contract deployed at:", deployment.contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
