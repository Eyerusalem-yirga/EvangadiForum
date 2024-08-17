import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayOut;