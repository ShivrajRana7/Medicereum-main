import React from "react";
import Logo from '../assets/Logo.png'
import videoUrl from '../assets/backVideo1.mp4'
import {useState }from 'react';
import Header from './Header';


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
                        <img src={Logo} style={{width:"100px", height:"100px"}} />
                        <div className="dmatrix-nav-item" style={{fontFamily:"Montserrat', sans-serif"}}>
                            <a>Your Account: {accountObject.web3Account}</a>
                        </div>
                        <div className={toggleToggle[toggle]} onClick={doingToggle}></div>
                    </header> 
                    <section className={menuToggle[toggle]}>
                    <video src={videoUrl} muted loop autoPlay></video>
                    <div className="overlay"></div>
                        <div className="text">
                            <h3>Medicereum</h3>
                            <p>A Blockchain based decentralized software solution for Pharmaceutical Supply Chain Management</p>
                        </div>
                    </section>    
                 </section>
             </div>
              <div className="menu">
                <ul>
                     <li><a href="/">Home</a></li>
                     <li><a href="/manufacturer">Manufacturer</a></li>
                     <li><a href="/consumer">Consumer</a></li>
                     <li><a href="/supplier">Supplier</a></li>
                 </ul>
             </div>   
        </>
      
    );
  }
  export default Home;