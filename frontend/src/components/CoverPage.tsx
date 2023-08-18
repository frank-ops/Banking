import React, { ReactNode } from "react";
import Intro from "./Intro";
import Signup from "./Signup";
import Signin from "./Signin";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";

interface Props{
  node:ReactNode
}

const CoverPage = ({node}:Props) => {

  return (
    <div className="w-full h-screen">
       <div className="w-full h-full fixed z-50">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-row justify-center items-center py-7 ">
            <p
              className="text-6xl font-mono font-bold "
              style={{ color: "#FF55BB" }}
            >
              Assure Bank
            </p>
          </div>
          <div
            className="w-max flex flex-col justify-center items-center mt-20 py-7 px-3 rounded-lg "
            style={{ 
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter:"blur(2px)"
            }}
          >
           {node} 
          </div>
        </div>
      </div>
      <div
        className="w-full h-full fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.9),rgba(0,200,40,0.2),rgba(0,0,0,0.6))",
        }}
      ></div>
      <img
        className="w-full h-full"
        src="/assets/coverimage.jpg"
        alt="image1"
      />
    </div>
  );
};

export default CoverPage;
