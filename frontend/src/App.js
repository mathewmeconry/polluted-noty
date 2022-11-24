import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";

import userContext from "./contexts/userContext";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import React, {useEffect, useState} from "react";
import Notes from "./views/Notes";
import New from "./views/New";
import Profile from "./views/Profile";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function func() {
      const userResponse = await fetch("/api/user/me");
      const userJson = await userResponse.json();
      if (userJson && userJson.id) {
        setUser(userJson);
      }
    }
    func();
  }, []);

  return (
    <userContext.Provider value={{user, setUser}}>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
