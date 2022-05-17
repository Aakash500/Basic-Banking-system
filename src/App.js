import React from 'react'
import Home from './Components/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Customers from './Components/Customers'

function App() {
  return (
   <>
   <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customers" element={<Customers/>}/>
      </Routes>
   </Router>

   </>

  )
}

export default App