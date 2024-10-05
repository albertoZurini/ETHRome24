import { createAccount, getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
import {
  type AccountWallet,
  CheatCodes,
  ExtendedNote,
  Fr,
  Note,
  type PXE,
  TxStatus,
  computeSecretHash,
  createPXEClient,
  waitForPXE,
} from '@aztec/aztec.js';
import { TestContract } from '@aztec/noir-contracts.js/Test';


const pxe = createPXEClient(PXE_URL);
await waitForPXE(pxe);

let [owner, recipient] = await getDeployedTestAccountsWallets(pxe);
let token = await TokenContract.deploy(owner, owner.getCompleteAddress(), 'TokenName', 'TokenSymbol', 18)
  .send()
  .deployed();
