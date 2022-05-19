import React from "react";

const Home = () => {
  return (
      <div className="container">
      <div className="card text-white bg-dark mt-5" >
        <div className="card-header">Bank prototype</div>
        <div className="card-body">
          <h5 className="card-title">About</h5>
          <ul className="card-text">
            <li>
            With this web app user can transfer money to other person via clicking on their name from the table
            </li>
            <li>
                One can also see tranfer history
            </li>
          </ul>
        </div>
      </div>
      </div>
  );
};

export default Home;
