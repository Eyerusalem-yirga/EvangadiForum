import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Answer from "./pages/answer/Answer";
import AddQuestion from "./pages/question/AddQuestion";

export const appState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [islogedin, setIslogedin] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    console.log(":::::");
    if (token) {
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
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <appState.Provider value={{ user, setUser, islogedin, setIslogedin }}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/answer/:id" element={<Answer />} />
        <Route path="/home/question" element={<AddQuestion />} />
      </Routes>
    </appState.Provider>
  );
}

export default App;

// import React, { useEffect, useState, createContext } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import axios from "./axiosConfig";
// import Auth from "./pages/auth/Auth";
// import Home from "./pages/home/Home";
// import Answer from "./pages/answer/Answer";
// import AddQuestion from "./pages/question/AddQuestion";
// export const appState = createContext();

// function App() {
//   const [user, serUser] = useState({});
//   const [islogedin, setIslogedin] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   async function checkUser() {
//     try {
//       const { data } = await axios.get("/users/check", {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       serUser(data);
//     } catch (error) {
//       console.log(error.response);
//       navigate("/");
//     }
//   }
//   useEffect(() => {
//     checkUser();
//   }, []);
//   return (
//     <>
//       <appState.Provider value={{ user, serUser, islogedin, setIslogedin }}>
//         <Routes>
//           <Route path="/" element={<Auth />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/home/answer/:id" element={<Answer />} />
//           <Route path="/home/question" element={<AddQuestion />} />
//         </Routes>
//       </appState.Provider>
//     </>
//   );
// }

// export default App;
