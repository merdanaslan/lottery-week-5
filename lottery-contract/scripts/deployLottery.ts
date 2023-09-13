import * as dotenv from 'dotenv';
import { deployLotteryContract } from "./common";
dotenv.config();

async function main() {
  console.log("Deploying Lottery contract");

  const tokenContract = await deployLotteryContract();
  
  const address = await tokenContract.getAddress();
  console.log(`Lottery contract deployed at address ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});