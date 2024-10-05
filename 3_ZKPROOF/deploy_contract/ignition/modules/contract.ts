// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UltraVerifierModule = buildModule("UltraVerifier", (m) => {
  const contract = m.contract("UltraVerifier");

  return { contract };
});

export default UltraVerifierModule;
