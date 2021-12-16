import React, { useRef, useEffect, useState } from "react";
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Manufacturer from './components/Manufacturer';
import Consumer from './components/Consumer';
import Supplier from './components/Supplier';
import About from "./components/About";
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

import { SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS } from './repository/address';
import { SUPPLYCHAIN_CONTRACT_ABI } from './repository/supplychain';

import Web3 from 'web3';

function App() {
  let web3 = new Web3("wss://ws-mumbai.matic.today");
  const [supplychainContract, setsupplychainContract] = useState();

  useEffect(() => {
    loadWeb3();
  }, []);

  const [web3objectDetails,setWeb3Object] = useState({
    web3Account : "",
    web3AccountNetworkId: ""
  });

  async function loadWeb3 (){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    
    await loadBlockchainData() 
    let supplychainContract = new web3.eth.Contract(SUPPLYCHAIN_CONTRACT_ABI, SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS);
    setsupplychainContract(supplychainContract);
    console.log(supplychainContract);
   }

   async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    setWeb3Object({
      web3Account: accounts[0],
      web3AccountNetworkId : networkId
    }) 
   }


  return (
    // <>
    //   <Router>
    
    //     <Routes>
    //       <Link to="/"><Route exact path="/" element={<Home accountObject={web3objectDetails} />} /></Link>
    //       <Link to="/Manufacturer"><Route exact path="/Manufacturer" element={<Manufacturer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} /></Link>
    //       <Link to="/Consumer"><Route exact path="/Consumer" element={<Consumer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} /></Link>
    //       <Link to="/Supplier"><Route exact path="/Supplier" element={<Supplier accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} /></Link>
    //     </Routes>
    //   </Router>
    // </>
    <>
    {/* <Header accountObject={web3objectDetails} /> */}
    {/* <Home accountObject={web3objectDetails} /> */}
    {/* <Consumer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} /> */}
    {/* <Supplier accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} /> */}
    {/* <Manufacturer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} /> */}
    <Router>
      <div>
        <Routes>
          <Route exact path= "/" element={<Home accountObject={web3objectDetails} />} />
          <Route exact path= "/consumer" element={ <Consumer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} />
          <Route exact path= "/supplier" element={<Supplier accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} />
          <Route exact path= "/manufacturer" element={<Manufacturer accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} />
          <Route exact path= "/about" element={ <About accountObject={web3objectDetails} web3Object = {web3} supplychainContract={supplychainContract} />} />
        </Routes>
      </div>
    </Router>

    </>
  );
}

export default App;