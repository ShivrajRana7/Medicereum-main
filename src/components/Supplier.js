import {Jumbotron, Container,Card, CardColumns, Button, Row,Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState } from 'react';
import {toast} from 'react-toastify';
import { SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS } from '../repository/address';
import '../Styles/Supplier.css'
import Navbar from './Navbar';

const Supplier = ({accountObject,web3Object,supplychainContract}) => { 

    let web3 = web3Object;
    let txHash = '';
    const [vote, setvote] = useState('');
    const [batch, setBatchCode] = useState('')
    toast.configure();

    async function handleSubmit(event) {
        var checksupplier = await supplychainContract.methods.distributors(accountObject.web3Account).call();
        // console.log(checksupplier["1"]);
        if(checksupplier["1"] == true){
            const transactionParameters = {
                to: SUPPLYCHAIN_CONTRACT_DEPLOY_ADDRESS,
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
                    status: toast('The transaction will not be completed as you are not a verified supplier!')
                }
            }
        }
        else{
            toast('The transaction will not be completed as you are not a verified supplier!'); 
        }
    }
    return (
        <>
        <Navbar />
        <div className="supplier">
            <h1>Supplier</h1>
            <p>
                To verify the medicine, compare the batch doc and give a verification vote.
            </p>
            
            <div className="mt-4">
                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Select aria-label="Default select example" onChange={(e) => { setvote(e.target.value) }}>
                        <option selected disabled>Is the batch genuine?</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Enter the scanned batch code" onChange={(e) => { setBatchCode(e.target.value) }} />
                </Form.Group>

                <Button style={{background:"#5840ba"}} onClick={handleSubmit}>Submit</Button>

            </div>
            {/* <div className="main-inputs">
                <Form.Select aria-label="Default select example" onChange={(e) => { setvote(e.target.value) }}>
                <option>Is the batch OK? </option>
                <option value="1">Yes</option>
                <option value="2">No</option>
                </Form.Select>
                <input type="text" placeholder="Enter your new batch code" onChange={(e) => { setBatchCode(e.target.value) }} />
                <input type="submit" value="Submit" onClick={handleSubmit} />

                <button onClick={(e) => { e.preventDefault(); }}>Scan QR code</button>
            </div> */}
            
                {txHash ? <h2>Batch Verified : {batch}</h2> : null}
        </div>
        </>
    )
}

export default Supplier;