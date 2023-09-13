import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseGwei } from "viem";
import { LOTTERY_CONTRACT } from "../constants";

const TOKEN_ADDRESS = LOTTERY_CONTRACT;

export function Bet() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);

  const {config} = usePrepareContractWrite({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "bet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'bet',
    args: [],
    value: parseGwei("0")
  });
  const {write} = useContractWrite(config);

  if (!data)
    return (
      <div>
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Betting..." : "Bet"}
        </Button>
      </div>
    );
}
