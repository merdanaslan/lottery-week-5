import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseGwei } from "viem";
import { LOTTERY_CONTRACT } from "../constants";
import { EventChange } from "./typeEvents";

const TOKEN_ADDRESS = LOTTERY_CONTRACT;

export function Approve() {
  const [but, setBut] = useState<any>(null);
  const [tokens, setTokens] = useState(0);

  const {data, isError, isLoading }  = useContractRead({
    address: TOKEN_ADDRESS,
    abi: [
      {
        "inputs": [],
        "name": "paymentToken",
        "outputs": [
          {
            "internalType": "contract LotteryToken",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    functionName: "paymentToken",
  });

  const tokenAddress = typeof data == 'string' ? data : "";

  const {config} = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'approve',
    args: [TOKEN_ADDRESS, tokens],
    value: parseGwei("0")
  });
  const {write} = useContractWrite(config);

  if (!but)
    return (
      <div>
        <Input
          sx={{ my: 1 }}
          color="primary"
          size="md"
          variant="outlined"
          value={tokens}
          onChange={(e: EventChange) => {
            return setTokens(parseInt(e.target.value));
          }}
          placeholder="Amount of tokens to approve for spending:"
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Approving spending of tokens..." : "Approve spending"}
        </Button>
      </div>
    );
}
