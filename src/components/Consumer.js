import React, { Component, useState, useRef, useEffect } from 'react';
import {Jumbotron, Container,Card, CardColumns, Button, Row,Col,Form, ListGroup, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
// import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import { SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS } from '../repository/address';
import { SUPPLYCHAIN_CONTRACT_ABI } from '../repository/supplychain';

import '../Styles/Consumer.css';


const Consumer = ({accountObject,web3Object,supplychainContract}) => { 
    let web3 = web3Object;
    const qrRef = useRef(null);
    const [medname, setmedname] = useState('');
    const [batchdoc, setbatchdoc] = useState('');
    const [addr, setaddr] = useState('');
    const [position, setposition] = useState('');
    const [datetime, setdatetime] = useState('');
    const [verifycount, setverifycount] = useState('');
    const [vermap, setvermap] = useState({data: [{
        Position: "",
        Address: "",
        Date: "",
        VerificationStatus: ""
    }]});
    const [batch, setBatchCode] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const [selectedOpt,setSelectedOpt] = useState('');
    
    async function handleSubmit(event) {
        //alert(batch);
        console.log(supplychainContract);
        var basedata = await supplychainContract.methods.batch(batch).call();
        console.log(basedata);
        setmedname(basedata["0"]);
        setdatetime(basedata["1"]);
        setbatchdoc(basedata["2"]);
        let count = basedata["3"];
        let verification = vermap.data;


        if(count<=0){
            console.log("Inside that oops part");
            toast("This medicine hasn't been verified yet!");
        }
        else{
            for(var i = count - 1 ;i>=0; i--){
                console.log("Counter from loop: ", i);
                var data = await supplychainContract.methods.viewverifiedData(batch,i).call();
                console.log(data);
                verification.push({
                    Position: data["0"],
                    Address: data["1"],
                    Date: data["2"],
                    VerificationStatus: data["3"]
                })
            }
        setvermap({data:verification});
        }
    }
    const handleErrorFile = (error) => {
        console.log(error);
      }
      const handleScanFile = (result) => {
          if (result) {
            setScanResultFile(result);
              
          }
      }
      const onScanFile = () => {
        qrRef.current.openImageDialog();
      }
      const handleErrorWebCam = (error) => {
        console.log(error);
      }
      const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
            console.log(result);
           
            
        
           
        }
    }
   
    return (
        
        <div className="consumer">
            <h1>Consumer</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="consumer-inputs">
                <input type="text" placeholder="Enter your new batch code" onChange={(e) => { setBatchCode(e.target.value) }} />
                <input type="submit" value="Submit" onClick={handleSubmit} />

                
           <div>
           {/* <button onClick={onScanFile}>Scan QR code</button> */}
           
           <select onChange={(e) => {setSelectedOpt(e.target.value);}}>
                <option selected disabled>Choose an option to scan QR</option>
                <option value="file" >Scan via file browser</option>
                <option value="webcam">Scan Via Web Cam</option>
            </select>
            
                <div style={{display: selectedOpt == "webcam" ? "block" : "none"}}>

                <QrReader
               
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorWebCam}
                          onScan={handleScanWebCam}
                         
                        />
                        <h3>Scanned : {scanResultWebCam}</h3>
                     </div>




                     <div style={{display: selectedOpt == "file" ? "block" : "none"}}>
                           <button onClick={onScanFile}>Scan QR code</button>
                <QrReader
                         ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                         
                        />
                        <h3>Scanned Code: {scanResultFile}</h3>
                     </div>

                     
          
                       


                        
               {medname? <h2>Medicine Name : {medname}</h2> : null}
               {batchdoc? <h2>Batch Doc : <a href={"https://ipfs.infura.io/ipfs/"+ batchdoc} target="_blank">Doc Link</a></h2> : null}
               {medname? <MapComponent Mapdata={vermap}/> : null}
        </div>
        </div>
        </div>
    )
}



export default Consumer;



const MapComponent = ({Mapdata}) => {
    return(    
           
               <div>
                {Mapdata["data"].map(el => (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Address</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{el.Position}</td>
                                <td>{el.Address}</td>
                                <td>{el.Date}</td>
                            </tr>
                        </tbody>
                    </Table>
                ))}
            </div>
    )
}

