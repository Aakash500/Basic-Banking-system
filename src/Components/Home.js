import React from "react"
import {Link} from "react-router-dom"
import "./Home.css"
const Home = () =>{
   
    return(
        <div className="main">
            <h2 className="title">Banking System</h2>
            <Link to="/customers"><button className="viewCustomer">view customer</button></Link>
        </div>
    )
}

export default Home