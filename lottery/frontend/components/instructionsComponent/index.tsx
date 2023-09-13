import React from 'react';
import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import { useAccount, useBalance, useContractRead, useNetwork } from "wagmi";
import { AspectRatio, Card, Divider, Skeleton } from "@mui/joy";
import Address from "./address";
import ChainName from "./chainName";
import { SignMessage } from "./SignMessage";
import { Bet } from "./bet";
import { GetTokens } from "./buyTokens";
import { OpenBets } from "./OpenBets";
import { backendBaseUrl } from "@/app/constants";
import { Approve } from "./approve";
import { CloseLottery } from "./closeLottery";
import { ReturnTokens } from "./returnTokens";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: 'black' }}>Lottery</h1>
      <div>
        <input
          type="text"
          placeholder="0"
          style={{ width: '300px', height: '40px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Buy Tokens
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="0"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '180px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Buy Tokens Approve Spending
        </button>
      </div>
      <div>
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Bet
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="0"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Set Days of Duration
        </button>
      </div>
      <div>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Close Lottery
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="0"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '150px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Return Tokens
        </button>
      </div>
    </div>
  );
};

export default App;
