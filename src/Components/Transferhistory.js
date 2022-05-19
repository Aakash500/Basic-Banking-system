import React from 'react'
import axios from "axios"

function Transferhistory() {
    const [history, setHistory] = React.useState([])
    React.useEffect(()=>{
        axios.get("http://localhost:5000/").
        then((response)=>{
            setHistory(response.data)
        })
    },[])
    if(history.length === 0) {
        return <span>Loading.....</span>
    }
  return (
    <div className="container mt-5">
        <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount(Rs)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.From}</td>
                <td>{item.To}</td>
                <td>{item.Amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Transferhistory