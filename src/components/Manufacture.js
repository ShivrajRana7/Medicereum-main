import {Jumbotron, Container,Card, CardColumns, Button, Row,Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useEffect} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ipfsClient = require('ipfs-api');
const projectId = '1uwWDcQaH4IZJCPBDWg7v6MVOjM';
const projectSecret = '00aaa00d490362c0063845e697a2f819';
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = new ipfsClient({ host: 'ipfs.infura.io',  port: 5001,protocol: 'https', headers: {authorization: auth} });
var filehash = '';
const Manufacture = ({accountObject,web3Object,supplychainContract}) => { 

    let web3 = web3Object;
    const [medname, setmedname] = useState('');
    const [batch, setBatchCode] = useState('');
    const [addr, setaddr] = useState('');
    const [position, setposition] = useState('');
    const [type, settype] = useState('');
    const [fileUploadStatus,setUploadStatus] = useState('File Not selected');
    const [selectedOpt,setSelectedOpt] = useState("");

    toast.configure();

    
    async function handleFileInput(e){
        console.log('here')
   
        const file = e.target.files[0];
        setUploadStatus('Got your file');
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file)
        setUploadStatus('Reading your file');
        reader.onloadend = function() {
           // Connect to IPFS
          setUploadStatus('Connecting to IPFS');
          const buf = Buffer.from(reader.result) // Convert data into buffer
           ipfs.add(buf, async function(err, result) { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          setUploadStatus('File uploaded');
          let url = `https://ipfs.infura.io/ipfs/${result[0].hash}`
      
          setUploadStatus('Doc added');
          console.log(result[0].hash);
          filehash = result[0].hash;
          console.log('File hash submitted');
          console.log(`Url --> ${url}`)
          // document.getElementById("url").innerHTML= url
          // document.getElementById("url").href= url
          // document.getElementById("output").src = url
          })
        }
        toast('Batch Doc Uploading...');
    }
    async function handleSubmission(e){
        console.log("File hash from submit: ", filehash);
        console.log("Account from submit: ", accountObject.web3Account);
        var check = await supplychainContract.methods.checkMaintainer().call({ from: accountObject.web3Account});
        console.log("Check: ", check)
        if(check == true){
        const transactionParameters = {
            to: "0xCa20cCa8A595778a3F4110ce54586c4351309383",
            from: accountObject.web3Account,
            'data': supplychainContract.methods.medialdata(batch,medname,filehash).encodeABI()
        };

        try {
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
                
            return {
                success: true,
                status: toast("Batch Added! Transaction Hash: " + txHash)
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }
        }
        else{
            toast("We cannot accept your submission as you are not the manufacturer!");
        }

    }


    async function handleSupplier(e){
        console.log("Address: ", addr);
        console.log("Position: ", position);
        console.log("Type: ", type);
        var check = await supplychainContract.methods.checkMaintainer().call({ from: accountObject.web3Account});
        console.log("Check: ", check)
        if(check == true){
        const transactionParameters = {
            to: "0xCa20cCa8A595778a3F4110ce54586c4351309383",
            from: accountObject.web3Account,
            'data': supplychainContract.methods.addDistOrReta(addr,type,position).encodeABI()
        };

        try {
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
                
            return {
                success: true,
                status: toast('New Supplier has been added!')
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }
    }
    else{
        toast("New Supplier not added as you are not the manufacturer!");
    }
        
        // var data=  supplychainContract.methods.addDistOrReta(address, type, position).send({from: accountObject.web3Account, gas: 300000});
        // console.log(data);
    }

    return(
            <>

            <select onChange={(e) => {setSelectedOpt(e.target.value);}}>
                <option selected disabled>-- Select --</option>
                <option value="batch" >New Batch</option>
                <option value="supplier">New Supplier</option>
            </select>
            <br /><br />

            <div>
                <div style={{display: selectedOpt == "batch" ? "block" : "none"}}>
                    <label>Batch Code:</label>
                    <input type="text" placeholder="Enter the new batch code" onChange={(e) => { setBatchCode(e.target.value) }} /><br />
                    <label>Medicine:</label>
                    <input type="text" placeholder="Enter the medicine name" onChange={(e) => { setmedname(e.target.value) }} />
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Batch Doc</Form.Label>
                    <Form.Control type="file" onChange={(e)=> handleFileInput(e)}/>
                    </Form.Group>   
                    <p style={{letterSpacing:"1px"}}>Upload Status:{fileUploadStatus}</p>

                    
                    <br /><br />
                    <button onClick={handleSubmission}>Submit</button>
                </div>
                <br /><br />
                <div style={{display: selectedOpt == "supplier" ? "block" : "none"}}>
                    <label>Add Supplier:</label>
                    <input type="text" placeholder="Enter the ethereum address of supplier" onChange={(e) => { setaddr(e.target.value) }} />

                    <label>Position:</label>
                    <input type="text" placeholder="Enter the supplier's position" onChange={(e) => { setposition(e.target.value) }}/>
                    <br /><br />
                    <Form.Select aria-label="Default select example" onChange={(e) => { settype(e.target.value) }}>
                    <option>Type of Supplier</option>
                    <option value="1">Distributor</option>
                    <option value="0">Retailer</option>
                    </Form.Select>
                    <button onClick={handleSupplier}>Add</button>
                </div>
            </div>

            </>
        );
}

export default Manufacture;