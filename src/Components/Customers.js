import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./Customers.css";

function Customers() {
  const [d, setd] = useState([]);
  const [show, setShow] = useState(false);
  const [fromname, setFrom] = useState("");
  const [toname, setTo] = useState("");

  const handleClose = () => {
    setShow(false);
    setTo("")
  }
  const handleShow = (e) => {
    setShow(true);  
    setFrom(e.target.innerHTML);
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
    <div>
      <Link to="/">Back</Link>
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
                <td className="name" onClick={handleShow}>
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
          <Modal.Title>Modal heading</Modal.Title>
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
                  <input type="text" name="To" id="To" onChange={handleToName} value={toname}/>
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <input type="number" name="amount" id="amount" step={100} />
                </div>
              </form>
            </div>

            <div className="userDetail">
              <div className="accountIcon"></div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="footer">
          <Button variant="primary" onClick={handleClose}>
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
