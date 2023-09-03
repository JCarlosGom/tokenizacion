import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { default as Menu } from './pages/Menu';
import { default as Solutions } from './pages/Solutions';
import Cards from './pages/Cards';
import Footer from './pages/Footer';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Sidebar from './pages/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {

  const [metamask, setMetamask] = useState(false);
  const [web3, setWeb3] = useState(null); //guardar instancia de web3
  const [account, setAccount] = useState(null); // guardar cuenta
  const [balance, setBalance] = useState(null);// guardar el balance

  const { ethereum } = window;
  
  const conectarWallet = async () => {
    console.log("conectar Wallet");
    if (typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      try {
        // await window.ethereum.enable();
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts[0]);
        setAccount(accounts[0]);
        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        // console.log(balanceWei);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
        // const balanceEth = 0.7;
        console.log(balanceEth);
        setBalance(balanceEth);
        setMetamask(false);
      } catch (error) {
        console.log(error);
      };
    } else {
      setMetamask(false);
    }
  };

  useEffect(() => {
    async function Wallet() {
      if (typeof window.ethereum !== 'undefined') {
        setMetamask(true);
      } else {
        console.log('No tenemos wallet');
      }
    };
    Wallet();
  }, []);

  return (
    <>
      <Menu conectarWallet={conectarWallet} balance={balance} metamask={metamask}></Menu>
      <Sidebar account={account} balance={balance} conectarWallet={conectarWallet} metamask={metamask}></Sidebar>
      <Cards></Cards>
      <Solutions></Solutions>
      <Footer></Footer>
    </>
  );
}

export default App;