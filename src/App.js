import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import "./components/styles.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      {user ? (
        <Chat user={user} />
      ) : (
        <>
          <Login onLogin={setUser} />
          <Register />
        </>
      )}
    </div>
  );
};

export default App;
