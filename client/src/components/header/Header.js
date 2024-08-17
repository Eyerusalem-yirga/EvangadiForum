import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/img/logo.png";
import { CiMenuBurger } from "react-icons/ci";
import { appState } from "../../App";
import { useContext, useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { setIslogedin, islogedin } = useContext(appState);

  const handleHomeClick = () => {
    if (islogedin) {
      navigate("/home");
    } else {
      // Redirect to login or show a message indicating authorization is required
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIslogedin(false); // Update islogedin state to false
    navigate("/"); // Navigate to the root route after logout
    window.location.reload();
    setIslogedin(false);
  };

  return (
    <>
      <div className="flex header1 justify-center gap-60 items-center Class Properties mt-1 shadow py-2 fixed bg-white">
        <div className="w-52">
          <Link to={"/home"} onClick={handleHomeClick}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <ul className="flex displayinvisible gap-6 font-medium">
          <Link to={"/home"}>
            <li>Home</li>
          </Link>

          <li>How it Works</li>
          {islogedin ? (
            <Link className=" text-xl  " onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to={"/"}>
              <button className="bg-blue-600 py-1 text-white px-14 rounded-sm">
                Sign Up
              </button>
            </Link>
          )}
        </ul>
        <div className="hidden displayvisible ">
          <CiMenuBurger />
        </div>
      </div>
    </>
  );
}

export default Header;