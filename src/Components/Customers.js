import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios"
import "./Customers.css";


function Customers() {
  const [d, setd] = useState([]);
  const [show, setShow] = useState(false);
  const [fromname, setFrom] = useState("");
  const [toname, setTo] = useState("");
  const [curruser, setCurruser] = useState({});
  const [amount, setAmount] =  useState(0);

  const getRef = (message) => document.getElementsByClassName(message)[0]

  const possibleTransfer = () =>{
    if(amount>curruser.balance || amount<=0) {
      // getRef("amount_message").innerHTML = "Amount must not be more than balance"
      return true;
    }
    else{
      // getRef("amount_message").innerHTML = ""
      return false;
    }
  }

  const possibleName = () =>{
    if(fromname.toLowerCase() === toname.toLowerCase()){
      // getRef("to_message").innerHTML = "names cannot be same"
      return true;
    }
    else {
      // getRef("to_message").innerHTML = ""
      return false;
    }
  }

  const handleSend = () =>{
    let res = window.confirm(`Are you sure to transfer ${amount}Rs to ${toname}`);
    if(res){
      setShow(false);
      axios.patch("http://localhost:5500/",[
        Number(amount),
        Number(curruser.balance-amount),
        fromname,
        toname
    ]).then((res)=>{
        if(res.data.length === 0){
          alert("Name not found try again with correct details")
        }else{
          setd(res.data)
        }
      })
    }
  }

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }

  const handleClose = () => {
    setShow(false);
    setTo("")
    setAmount("");
  }


  const handleShow = (user) => {
    setShow(true);  
    setFrom(user.name)
    setCurruser(user)
  }
  const handleToName = (e) =>{
    setTo(e.target.value)
    console.log(toname);
  }

  async function getData() {
    const data = await fetch("http://localhost:5500/");
    const res = await data.json();
    setd(res);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mt-5">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Mail</th>
            <th scope="col">Phone(+91)</th>
            <th scope="col">Balance(Rs)</th>
          </tr>
        </thead>
        <tbody>
          {d.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td className="name" onClick={()=>handleShow(item)}>
                  {item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.phoneno}</td>
                <td>{item.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Money</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="customer">

            <div className="TransferSection">
              <form>
                <div>
                  <label htmlFor="From">From:</label>
                  <input type="text" name="From" id="From" value={fromname}  placeholder={fromname} disabled/>
                </div>
                <div>
                  <label htmlFor="To">To:</label>
                  <input type="text" autoComplete="off" name="To" id="To" onChange={handleToName} value={toname}/>
                  <p className="to_message"></p>
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <input type="number" autoComplete="off" name="amount" id="amount" step={100} s onChange={handleAmount} value={amount}/>
                  <p className="amount_message"></p>
                </div>
              </form>
            </div>

            <div className="userDetail">
              <div className="accountIcon"></div>
              <div className="details">
                <div className="field">
                  <span>Name</span>
                  <span>Balance</span>
                  <span>Phone no.</span>
                </div>
                <div className="value">
                  <span>{fromname}</span>
                  <span>Rs.{curruser.balance}</span>
                  <span>{curruser.phoneno}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="footer">
          <Button variant="primary" onClick={handleSend} disabled={possibleTransfer() || possibleName()} >
          send money
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Customers;
