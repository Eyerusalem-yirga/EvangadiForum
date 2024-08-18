import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { appState } from "../../App";

function Register({ dispatch }) {
  const { setIslogedin } = useContext(appState);
  const navigate = useNavigate();
  const userNameDOM = useRef();
  const firstNameDOM = useRef();
  const lastNameDOM = useRef();
  const emailsignDOM = useRef();
  const passwordsignDOM = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmitSignup(e) {
    e.preventDefault();

    const usernamevalue = userNameDOM.current.value;
    const firstvalue = firstNameDOM.current.value;
    const lastvalue = lastNameDOM.current.value;
    const emailsignvalue = emailsignDOM.current.value;
    const passwordsignvalue = passwordsignDOM.current.value;
    if (
      !usernamevalue ||
      !firstvalue ||
      !lastvalue ||
      !emailsignvalue ||
      !passwordsignvalue
    ) {
      // setmessage(false);
      setErrorMessage("ALL fields are required");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernamevalue,
        firstname: firstvalue,
        lastname: lastvalue,
        email: emailsignvalue,
        password: passwordsignvalue,
      });
      // alert("The user already registered");

      navigate("/login");
      // navigate("/");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
        alert("No response received from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        alert("Something went wrong. Please try again later.");
      }
      console.log("Error config:", error.config);
    } finally {
      if (!successMessage) {
        setSuccessMessage(true);
      } // Call this function regardless of the outcome
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="mt-8">
        <h3 className="text-center font-medium mb-2">Join the network</h3>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <p className="text-neutral-600 text-sm text-center mb-3">
          Already have an account?{" "}
          <Link
            onClick={() => dispatch({ type: "login" })}
            className="text-amber-500"
          >
            Sign in
          </Link>
        </p>
        <form className="ml-6" onSubmit={handleSubmitSignup}>
          <div>
            <input
              className="border w-11/12 py-2 pl-1 inputs mb-3 text-sm"
              ref={emailsignDOM}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex gap-2 w-11/12">
            <input
              className="border w-full py-2 pl-1 inputs mb-3 text-sm"
              ref={firstNameDOM}
              type="text"
              placeholder="First Name"
            />
            <input
              className="border w-full py-2 pl-1 inputs mb-3 text-sm"
              ref={lastNameDOM}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              className="border w-11/12 py-2 pl-1 inputs mb-3 text-sm"
              ref={userNameDOM}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <input
              className="border w-11/12 py-2 pl-1 inputs mb-3 text-sm pr-10"
              ref={passwordsignDOM}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute top-3 right-12 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-3 right-12 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div>
            <button
              className="border w-11/12 py-2 pl-1 mb-3 text-white bg-blue-600 rounded-md"
              type="submit"
            >
              Agree and Join
            </button>
          </div>
        </form>
        <p className="text-xs text-center mt-4 mb-2">
          I agree to the <span className="text-amber-500">privacy policy</span>{" "}
          and <span className="text-amber-500">terms of service</span>
        </p>
        <Link
          onClick={() => dispatch({ type: "login" })}
          className="text-amber-500 text-xs ml-36 mb-6 text-center"
        >
          Already have an account?
        </Link>
      </section>
    </>
  );
}

export default Register;
