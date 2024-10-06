// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleUltraVerifierModule = buildModule("SimpleUltraVerifier", (m) => {
  const contract = m.contract("SimpleUltraVerifier");

  return { contract };
});

export default SimpleUltraVerifierModule;
