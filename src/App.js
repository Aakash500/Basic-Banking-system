import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from './Components/Home'
import Customers from './Components/Customers'
import Transferhistory from './Components/Transferhistory'
import Header from './Components/Header'



function App() {
  return (
   <>
   <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/history" element={<Transferhistory/>}/>
      </Routes>
   </Router>
   </>
  )
}

export default App