import React, { ReactNode } from "react";
import CarouselCustom from "./Carasoul";
import { useNavigate } from "react-router-dom";
import SendMoney from "./SendMoney";
import AddMoney from "./AddMoney";
import Transactions from "./Transactions";

interface Props{
  node:ReactNode
}

const Home = ({node}:Props) => {
  const navigate = useNavigate()
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-start items-center"
      style={{
        backgroundImage: `url("/assets/homebg.jpg")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <div
        className="w-full min-h-screen flex flex-col justify-start items-center"
        style={{
          backdropFilter: "blur(4px)",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.95),rgba(0,0,0,0.1),rgba(0,0,0,0.6))",
            overflowY:"auto"
        }}
      >
        <div className="w-full h-[80] flex flex-row justify-between items-center px-7 py-6">
          <p
            className="text-4xl font-mono font-bold "
            style={{ color: "#FF55BB" }}
          >
            Assure Bank
          </p>
          <img className="w-8" src="/assets/logout.svg" alt="logout" onClick={()=>{navigate("/")}} />
        </div>
        <div className="w-full box-border grid lg:grid-cols-2 md:grid-cols-1 sm-grid-cols-1 mt-20 px-6">
          {node}
          <div className="flex flex-col box-border justify-center items-start w-full h-full py-12 px-16 ">
            <div className="w-full flex flex-row lg:justify-start md:justify-center py-6 lg:pl-[10%] "><button className="glow-on-hover text-white text-base" onClick={()=>{navigate("/home")}}>home</button></div>
            <div className="w-full flex flex-row lg:justify-start md:justify-center py-6 lg:pl-[25%]"><button className="glow-on-hover text-white text-base" onClick={()=>{navigate("/addmoney")}}>Add Money</button></div>
            <div className="w-full flex flex-row lg:justify-start md:justify-center py-6 lg:pl-[40%]"><button className="glow-on-hover text-white text-base" onClick={()=>{navigate("/sendmoney")}}>Send Money</button></div>
            <div className="w-full flex flex-row lg:justify-start md:justify-center py-6 lg:pl-[55%]"><button className="glow-on-hover text-white text-base" onClick={()=>{navigate("/transactions")}}>Transactions</button></div>
            <div className="w-full flex flex-row lg:justify-start md:justify-center py-6 lg:pl-[70%]"><button className="glow-on-hover text-white text-base" onClick={()=>{navigate("/accdetails")}}>Acc Details</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
