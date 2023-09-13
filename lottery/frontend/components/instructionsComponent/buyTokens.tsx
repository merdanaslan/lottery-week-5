import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseGwei } from "viem";
import { LOTTERY_CONTRACT } from "../constants";

const TOKEN_ADDRESS = LOTTERY_CONTRACT;

export function GetTokens() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);

  const {config} = usePrepareContractWrite({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "purchaseTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
    functionName: 'purchaseTokens',
    args: [],
    value: parseGwei(`${tokens}`)
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
          placeholder="Eth to send (Gwei)"
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Purchasing tokens..." : "Purchase tokens"}
        </Button>
      </div>
    );
}
