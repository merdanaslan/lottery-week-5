import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseGwei } from "viem";
import { LOTTERY_CONTRACT } from "../constants";
import { EventChange } from "./typeEvents";

const TOKEN_ADDRESS = LOTTERY_CONTRACT;

export function OpenBets() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [days, setDays] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  const {config} = usePrepareContractWrite({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "closingTime",
            "type": "uint256"
          }
        ],
        "name": "openBets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'openBets',
    args: [timestamp],
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
          value={days}
          onChange={(e: EventChange) => {
            return setDays(parseInt(e.target.value));
          }}
          placeholder="Days of duration."
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + days);
            setTimestamp(currentDate.getTime());
            write?.();
          }}
        >
          {isLoading ? "Openning Bets..." : "Open Bets (only owner). Set days of duration."}
        </Button>
      </div>
    );
}
