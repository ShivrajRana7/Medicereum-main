import {Jumbotron, Container,Card, CardColumns, Button, Row,Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState } from 'react';
import {toast} from 'react-toastify';
import '../Styles/Main.css'

const Supplier = ({accountObject,web3Object,supplychainContract}) => { 

    let web3 = web3Object;
    let txHash = '';
    const [vote, setvote] = useState('');
    const [batch, setBatchCode] = useState('')

    async function handleSubmit(event) {
        var checksupplier = await supplychainContract.methods.distributors(accountObject.web3Account).call();
        console.log(checksupplier["1"]);
        if(checksupplier["1"] == true){
            const transactionParameters = {
                to: "0xCa20cCa8A595778a3F4110ce54586c4351309383",
                from: accountObject.web3Account,
                'data': supplychainContract.methods.verifythedata(batch, vote).encodeABI()
            };

            try {
                txHash = await window.ethereum
                    .request({
                        method: 'eth_sendTransaction',
                        params: [transactionParameters],
                    });
                    
                return {
                    success: true,
                    status: toast('Batch Verified!')
                }
            } catch (error) {
                return {
                    success: false,
                    status: "😥 Something went wrong: " + error.message
                }
            }
        }
        else{
            toast('The transaction will not be completed as you are not a verified supplier!'); 
        }
    }
    return (
        <div className="main">
            <h1>Supplier</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="main-inputs">
                <Form.Select aria-label="Default select example" onChange={(e) => { setvote(e.target.value) }}>
                <option>Is the batch OK? </option>
                <option value="1">Yes</option>
                <option value="2">No</option>
                </Form.Select>
                <input type="text" placeholder="Enter your new batch code" onChange={(e) => { setBatchCode(e.target.value) }} />
                <input type="submit" value="Submit" onClick={handleSubmit} />

                <button onClick={(e) => { e.preventDefault(); }}>Scan QR code</button>
            </div>
            {
                txHash ? <h2>Batch Verified : {batch}</h2> : null
            }
        </div>
    )
}

export default Supplier;