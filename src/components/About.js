import React, { Component, useState, useRef, useEffect } from 'react';
import {Jumbotron, Container,Card, CardColumns, Button, Row,Col,Form, ListGroup, Table, Accordion} from 'react-bootstrap';
import Logo from '../assets/Logo.png'
import videoUrl from '../assets/backVideo1.mp4'
import { SUPPLYCHAIN_CONTRACT_ABI } from '../repository/supplychain';
import '../Styles/Consumer.css';
import '../Styles/About.css';
import Navbar from './Navbar';


const About = ({accountObject,web3Object,supplychainContract}) => { 
    let web3 = web3Object;
   
    return (
        <>
        <Navbar />
        {/* <div className="consumer">
            <h1>About Medecerium</h1>
            <p>
            Medicereum is full proof system for Medical Supply chain using a Decentralized structure: Blockchain which provides essential benefits like security and privacy, transparency, immutability and innovation. If an issue (such as a counterfeit drug or even just a faulty or expired drug) is detected, the user could look at all previous data entries, touch points, locations and timestamps to trace all the way back to find the origin of the product, the specific manufacturer and even the specific batch that it came from. This not only assures authenticity over and above a normal manual database which can be more easily tampered with and where individuals may be able to edit or remove important information, but also enables ways of verifying that an entity that has handled the product has complied with regulatory requirements.
            </p>
        </div> */}
         <div className="about">    
                        <div className="about-text">
                            <h1><b>Medecerium</b></h1>
                            <p>Medicereum is full proof system for Medical Supply chain using a Decentralized structure: Blockchain which provides essential benefits like security and privacy, transparency, immutability and innovation. 
                                If an issue (such as a counterfeit drug or even just a faulty or expired drug) is detected, the user could look at all previous data entries, touch points, locations and timestamps to trace all the way back to find the origin of the product, the specific manufacturer and even the specific batch that it came from. 
                                This not only assures authenticity over and above a normal manual database which can be more easily tampered with and where individuals may be able to edit or remove important information, but also enables ways of verifying that an entity that has handled the product has complied with regulatory requirements.</p>
                                <div className="dLogo">
                                    <img src={Logo} width="400px" alt=""></img>
                                </div>
                       </div>
             </div>
        <div className="about">
        <h1>Features</h1>
            <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Security</Accordion.Header>
                <Accordion.Body>
                Propose a novel privacy mechanism to maintain the privacy of data related to Medical , drugs and organizations related to the same. 
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Decentralized Application</Accordion.Header>
                <Accordion.Body>
                Develop a Decentralized Application (DApp) using Ethereum blockchain as a proof-of-concept of the proposed architecture. 
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Robustness</Accordion.Header>
                <Accordion.Body>
                Analyse the robustness of the developed DApp against the most widespread security attacks.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Pragmatic Architecture</Accordion.Header>
                <Accordion.Body>
                Introduce a novel blockchain-based pragmatic architecture for secure and reliable end-to-end tracking and monitoring of vaccines and drugs.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Supply Chain Integration </Accordion.Header>
                <Accordion.Body>
                A full proof system where medical companies can add the record of the medicine and the people can verify the medicine before using it, through blockchain based supply chain management. 
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
                <Accordion.Header>Offchain Storing Mechanical</Accordion.Header>
                <Accordion.Body>
                Utilize an off-chain mechanism to improve the scalability of the blockchain system. 
                </Accordion.Body>
            </Accordion.Item>  
            </Accordion>
            </div>
        </>
    )
}



export default About;

