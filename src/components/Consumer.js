import React, { Component, useState, useRef, useEffect } from 'react';
import {Jumbotron, Container,Card, CardColumns, Button, Row,Col,Form, ListGroup, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
// import QRCode from 'qrcode';
// import QrReader from 'react-qr-reader';
import { SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS } from '../repository/address';
import { SUPPLYCHAIN_CONTRACT_ABI } from '../repository/supplychain';
import '../Styles/Main.css';

const Consumer = ({accountObject,web3Object,supplychainContract}) => { 
    let web3 = web3Object;
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
    return (
        <div className="main">
            <h1>Consumer</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="main-inputs">
                <input type="text" placeholder="Enter your new batch code" onChange={(e) => { setBatchCode(e.target.value) }} />
                <input type="submit" value="Submit" onClick={handleSubmit} />

                <button onClick={(e) => { e.preventDefault(); }}>Scan QR code</button>
            </div>
               {medname? <h2>Medicine Name : {medname}</h2> : null}
               {batchdoc? <h2>Batch Doc : <a href={"https://ipfs.infura.io/ipfs/"+ batchdoc} target="_blank">Doc Link</a></h2> : null}
               {medname? <MapComponent Mapdata={vermap}/> : null}
        </div>
    )
}



export default Consumer;

const MapComponent = ({Mapdata}) => {
    return(
    //     <div>
    //   {
    //     Mapdata["data"].map(el=>(
    //         <div>
    //         {el.Position? <h2>Position: {el.Position}</h2> : null}
    //         {el.Address? <h2>Address: {el.Address}</h2> : null}
    //         {el.Date? <h2>Date: {el.Date}</h2> : null}
    //         </div>
      
    //     ))
    //   }
    //   </div>

            <div>
            { Mapdata["data"].map(el=>(
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