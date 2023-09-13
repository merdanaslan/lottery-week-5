import { ethers } from "ethers";
import { Lottery, LotteryToken, LotteryToken__factory, Lottery__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

const TOKEN_RATIO = 1n;
const BET_PRICE = 0.00000000000000001;
const BET_FEE = 0.000000000000000002;

const loadWallet = (provider: ethers.JsonRpcProvider) => {
  if (process.env.PRIVATE_KEY != undefined) {
    return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  }

  if (process.env.MNEMONIC != undefined) {
    if (typeof process.env.MNEMONIC === 'string' && process.env.MNEMONIC.length > 0) {
      const MNEMONIC: string = process.env.MNEMONIC;
      return ethers.Wallet.fromPhrase(MNEMONIC, provider);
    }

  }

  return ethers.Wallet.createRandom(provider);
}

export async function getProvider(){
  return new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
}

export async function getWallet() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
  const wallet = loadWallet(provider);
  console.log(`Using address ${wallet.address}`);

  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));

  console.log(`Wallet balance ${balance}`);

  if (balance < 0.01) {

    throw new Error("Not enough ether");

  }

  return wallet;
}

export async function deployLotteryContract() {
  const wallet = await getWallet();

  const lotteryFactory = new Lottery__factory(wallet);
  const lotteryContract = await lotteryFactory.deploy(
    "Lottery Token",
    "LT0",
    TOKEN_RATIO,
    ethers.parseUnits(BET_PRICE.toFixed(18)),
    ethers.parseUnits(BET_FEE.toFixed(18))
  );
  await lotteryContract.waitForDeployment();
  return lotteryContract;
}

export async function getLotteryContractAt(contractAddress: string) {
  const wallet = await getWallet();

  const tokenFactory = new Lottery__factory(wallet);
  const tokenContract = tokenFactory.attach(contractAddress) as Lottery;
  return tokenContract;
}

export async function getTokenContract(lotteryContractAddress: string) {
  const wallet = await getWallet();

  const lotteryFactory = new Lottery__factory(wallet);
  const lotteryContract = lotteryFactory.attach(lotteryContractAddress) as Lottery;
  
  const tokenAddress = await lotteryContract.paymentToken();
  const tokenFactory = new LotteryToken__factory(wallet);
  const tokenContract = tokenFactory.attach(tokenAddress) as LotteryToken;

  return tokenContract;  
}

async function getTimestamp() {
  let provider = await getProvider();
  let block = await provider.getBlock('latest');
  let timestamp = block?.timestamp;
  console.log(timestamp);
}
