import React, { useEffect, useState } from "react";
import web3 from "./web3";
import MyToken from "./MyToken.json"; // ABI file

const Token = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const tokenNetwork = MyToken.networks[networkId];
        const token = new web3.eth.Contract(MyToken.abi, tokenNetwork.address);
        const balance = await token.methods.balanceOf(accounts[0]).call();
        setBalance(balance);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    if (connected) {
      loadBlockchainData();
    }
  }, [connected]);

  const connectMetaMask = async () => {
    try {
      // Request account access if needed
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (error) {
      console.error("MetaMask connection failed:", error);
    }
  };

  return (
    <div className="app">
      <h1>Your Token Balance</h1>
      {account ? (
        <div className="content">
          <p>Account: {account}</p>
          <p>Balance: {balance}</p>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default Token;
