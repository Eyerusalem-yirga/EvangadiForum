import React from "react";
import logo from "../../../src/assets/img/logoF.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

function Footer() {
  return (
    <>
      <div className="flex footergap bg-slate-700 text-white gap-64 justify-center py-6">
        <div>
          <div className="w-40">
            <img src={logo} alt="" />
          </div>
          <ul className="flex gap-9 justify-center">
            <CiFacebook />
            <FaInstagram />
            <CiYoutube />
          </ul>
        </div>
        <div>
          <p className="text-md font-medium mb-6">Useful Link</p>
          <ul className="text-xs text-gray-400 ">
            <li className="mt-2">How it works</li>
            <li className="mt-2">Terms of Service</li>
            <li className="mt-2">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-md font-medium mb-6">Contact Info</p>
          <ul className="text-xs text-gray-400 ">
            <li className="mt-2">Evangadi Networks</li>
            <li className="mt-2">support@evangadi.com</li>
            <li className="mt-2">+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;