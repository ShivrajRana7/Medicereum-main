// import Navbar from "./Navbar";
import React from "react";
import logo from '../assets/logo.svg';
// import '../Styles/Home.css';
import {useState }from 'react';

const Home = ({accountObject}) => {

    const [toggle,setToggle] = useState(1)
    const menuToggle = ['showcase active','showcase']
    const toggleToggle = ['toggle active','toggle']
     const doingToggle = () => {
        if(toggle===0){
            setToggle(1)
        }else{
            setToggle(0)
        }
       
    }
    
    return (
        <>
            <div className="home-container">
        <section className={menuToggle[toggle]}>
            <header>
                <h2 className="logo">Medicereum</h2>
                <div className="dmatrix-nav-item">
            {/* <Link to="/account-info">Your Account: {accountObject.web3Account}</Link> */}
            <a>Your Account: {accountObject.web3Account}</a>
            </div>
                <div className={toggleToggle[toggle]} onClick={doingToggle}>
                </div>
                </header>      
                    <h5>The <b>DMatrix</b>, is a creative software driven by the power of blockchain to securely store your data
                        <div className="dLogo">
                            <img src={logo}></img>
                        </div>
                     </h5>
                
                </section>
             </div>
             <div className="menu">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Consumer</a></li>
                <li><a href="/">Supplier</a></li>
                <li><a href="/">Manufacturer</a></li>
                <li><a href="/">Contact</a></li>
            </ul>
        </div>    
        </>
      
    );
  }
  export default Home;