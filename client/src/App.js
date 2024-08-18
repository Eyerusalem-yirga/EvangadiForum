import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Answer from "./pages/answer/Answer";
import AddQuestion from "./pages/question/AddQuestion";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export const appState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [islogedin, setIslogedin] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    if (token) {
      // console.log("Token found");
      try {
        const { data } = await axios.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);

        setIslogedin(true);
      } catch (error) {
        console.log(error.response);
        console.log("error in app js, 1");
        // navigate("/");
      }
    } else {
      console.log("no token");
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, [token]);

  return (
    <appState.Provider value={{ user, setUser, islogedin, setIslogedin }}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/answer/:id" element={<Answer />} />
        <Route path="/home/question" element={<AddQuestion />} />
      </Routes>
    </appState.Provider>
  );
}

export default App;
