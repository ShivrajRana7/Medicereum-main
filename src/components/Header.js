import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../assets/Logo.png'
import {useState }from 'react';
// import '../Styles/Navbar.css'

const Header = ({accountObject,web3Object,supplychainContract}) => {
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
                            {/* <Link to="/account-info">Your Account: {accountObject.web3Account}</Link> */}
                            <a>Your Account: {accountObject.web3Account}</a>
                        </div>
                        <div className={toggleToggle[toggle]} onClick={doingToggle}></div>
                    </header> 
                    </section>
        </div>
         <div className="menu">
         <ul>
             <li><a href="/">Home</a></li>
             <li><a href="/">Manufacturer</a></li>
             <li><a href="/">Consumer</a></li>
             <li><a href="/">Supplier</a></li>
         </ul>
     </div>  
     </> 
    )
}

export default Header;