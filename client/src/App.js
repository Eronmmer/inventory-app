import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  useEffect( () => {
    axios
      .get("/api/allUsers")
      .then(res => {
        setUsers(res.data);
      })
      .catch( err => {
        console.error(err);
        setUsers("something went wrong. please refresh the page");
      });
  }, [users, setUsers]);
  const renderContent = () => {
    if (users === null) {
      return <h1>Loading...</h1>;
    }  else if(typeof users === "object") {
      return (
        <div>
          {users.map((user, index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  margin: "1rem",
                  border: "1px solid black",
                  background: "grey"
                }}
              >
                <p>Name:{user.name}</p>
                <p>
                  <strong>Email</strong>: {user.email}
                </p>
                <p>
                  <strong>Joined At</strong>: {user.memberSince}
                </p>
                <p>
                  <strong>Username</strong>: {user.username}
                </p>
                {user.company && <p>
                  <strong>Company</strong>: {user.company}
                </p>}
                {user.home && (<p>
                  <strong>Home</strong>: {user.home}
                </p>)}
              </div>
            );
          })}
        </div>
      );
    } else {
      return ( <div>{users}</div>)
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <p> This the rodeo bitch</p>
      <p>All our beautiful users</p>
      {renderContent()}
    </div>
  );
}

export default App;
