import React, { useState } from "react";
import "./App.css";
import { simpleStorageAbi } from "./abis/abis.js";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const contractAddr = "0xb28a4F1469637d1C270ceFF3C9583ED8F6C2C4dA";
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState(0);

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
  };

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number).estimateGas();
    const result = await SimpleContract.methods
      .set(number)
      .send({ from: account, gas });
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input
              type="text"
              name="name"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br />
        <button onClick={handleGet} type="button">
          Get Number
        </button>
        {getNumber}
      </header>
    </div>
  );
}

export default App;
