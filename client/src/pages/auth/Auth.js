import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import About from "../../components/about/About";
import LayOut from "../../components/layOut/LayOut";
import React, { useReducer } from "react";
const initialState = {
  status: "register",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,

        status: "login",
      };
    case "register":
      return {
        ...state,
        status: "register",
      };
  }
}
function Auth() {
  const [{ status }, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <section>
        <LayOut>
          <section className="flex justify-center block bg-full">
            <div className="w-1/2 relative  auth  bg-left">
              <div className="w-8/12 white1  shadow absolute authEner top-0 right-6 mt-7 rounded-md custom-height">
                {status === "login" && <Login dispatch={dispatch} />}
                {status === "register" && <Register dispatch={dispatch} />}
              </div>
            </div>
            <About />
          </section>
        </LayOut>
      </section>
    </>
  );
}

export default Auth;
