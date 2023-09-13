import * as dotenv from 'dotenv';
import { getTokenContract } from "./common";
import { LotteryToken, LotteryToken__factory } from '../typechain-types';
dotenv.config();

async function main() {
  const [contractAddress] = process.argv.slice(2);
  console.log("Approving votes...");

  const tokenContract = await getTokenContract(contractAddress);
  const delegateTx = await tokenContract.approve(contractAddress, 200);
  await delegateTx.wait();

  console.log("Approves 200 tokens spending to the lottery contract done...");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});