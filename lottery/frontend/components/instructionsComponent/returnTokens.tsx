import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseGwei } from "viem";
import { LOTTERY_CONTRACT } from "../constants";

const TOKEN_ADDRESS = LOTTERY_CONTRACT;

export function ReturnTokens() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);

  const {config} = usePrepareContractWrite({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "returnTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'returnTokens',
    args: [tokens],
    value: parseGwei("0")
  });
  const {write} = useContractWrite(config);

  if (!data)
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
          placeholder="Amount of tokens to change"
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Returning tokens..." : "Return tokens"}
        </Button>
      </div>
    );
}
