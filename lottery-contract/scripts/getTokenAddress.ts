import * as dotenv from 'dotenv';
import { deployLotteryContract, getLotteryContractAt } from "./common";
dotenv.config();

async function main() {
  console.log("Getting Lottery contract");

  const tokenContract = await getLotteryContractAt("0x348d89899E23D521B014530C9fcF4618EDb54688");
  
  const address = await tokenContract.paymentToken();
  console.log(`Lottery contract deployed at address ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});