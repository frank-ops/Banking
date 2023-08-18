import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate()
  return (
    <div className="max-w-3xl flex flex-col">
      <p
        className="text-4xl font-mono font-semibold py-6 "
        style={{ color: "#F6F1E9" }}
      >
        Experience seamless banking services at your fingertips. Empowering your
        financial journey with cutting-edge technology.
      </p>
      <div className="flex flex-row justify-center items-center ">
        <button className="rounded-full bg-fuchsia-800 hover:bg-fuchsia-700 text-2xl text-semibold text-white px-2 py-2 m-5 w-40" onClick={()=>{navigate("/signup")}}>
          sign up
        </button>
        <button className="rounded-full box-border border-2 border-fuchsia-800 focus:outline-none focus:border-2 focus:border-white text-2xl text-bold text-fuchsia-500 focus:text-white px-2 py-2 m-5 w-40" onClick={()=>{navigate("/signin")}}>
          sign in
        </button>
      </div>
    </div>
  );
};

export default Intro;
