import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import SearchResult from "./SearchResult";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import {BiLoaderAlt} from "react-icons/bi"


const SendMoney = () => {
  const [display, setDisplay] = useState<string>("none");
  const [value, setValue] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);
  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [amount,setAmount] = useState<number|string>("") 
  const [fore,setFore] = useState<boolean>(false)
  const [load,setLoad] = useState<boolean>(false)
  const [ack,setAck] = useState<boolean>(false)
  const [msg,setMsg] = useState<string>("")
  const user = useSelector((state: RootState) => state.user);
  useEffect(()=>{
    axios.get("http://localhost:8080/accounts/getAllAccountHolders").then(
     (res)=>{
       setNames(res.data)
     }
    )
  },[]) 
  const setter = (name: string) => {
    setValue(name);
    setDisplay("none");
  };
  const [node, setNode] = useState<ReactNode>(
    filteredNames.length > 0 ? (
      filteredNames.map((filter) => (
        <SearchResult key={uuidv4()} name={filter} nameSetter={setter} />
      ))
    ) : (
      <p className="text-sm font-normal font-mono text-white py-2">
        no matching names
      </p>
    )
  );
  useEffect(() => {
    setNode(
      filteredNames.length > 0 ? (
        filteredNames.map((filter) => (
          <SearchResult key={uuidv4()} name={filter} nameSetter={setter} />
        ))
      ) : (
        <p className="text-sm font-normal font-mono text-white py-4">
          no matching names
        </p>
      )
    );
  }, [filteredNames,names]);
 

  const nameFilter = (searchName: string) => {
    let list: string[] = [];
    names.forEach((name) => {
      if (name.search(searchName) > -1 && name!==user.name) {
        list.push(name);
      }
    });
    setFilteredNames(list);
  };
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.placeholder=="search name")
    {
    setValue(event.target.value);
    if (event.target.value.length === 0) {
      setDisplay("none");
    } else {
      setDisplay("block");
      nameFilter(event.target.value);
    }
  }
  else{
    setAmount(parseInt(event.target.value))
  }
  };
  const displaySetter = () => {
    setValue("");
    setDisplay("none");
    setFilteredNames([]);
  };

  const clickHandler = () =>{
    if(value.length>0 && amount !="0")
    {
      setLoad(true)
      setFore(true)
      axios.post("http://localhost:8080/transactions/addTransaction",{
        "sender_name":user.name,
        "receiver_name":value,
        "amount":amount
      }).then((res)=>{
        if(res.data==="transaction was successful"){
          setAmount("")
          setValue("")
        }
        setLoad(false)
        setMsg(res.data)
      })
    }
  }

  useEffect(()=>{
    if(msg.length>0)
    {
    setAck(true);
    }
  },[msg])

 const mCloser = () =>{
  setAck(false)
  setMsg("")
  setFore(false)
 }

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center py-7 px-3 rounded-lg "
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      <p className="text-3xl font-mono font-bold mt-6 " style={{ color: "#FF55BB" }}>
        Send Money
      </p>
      <div className="w-full h-full flex flex-col justify-start items-center mt-20 gap-6">
        <div className=" flex flex-row justify-center items-center w-1/2 border border-slate-400 rounded-full px-5 py-4 m-4 gap-4">
          <LuSearch color="white" size={"20px"} />
          <input
            className="bg-transparent w-full text-white text-base font-sans focus:outline-none"
            type="text"
            value={value}
            placeholder="search name"
            onChange={changeHandler}
          />
          <HiMiniXMark
            color="white"
            size={"25px"}
            style={{ display: `${display}`, cursor: "pointer" }}
            onClick={displaySetter}
          />
        </div>
        <div className=" flex flex-row justify-center items-center w-1/2 border border-slate-400 rounded-full px-12 py-4 m-4 gap-4">
          <input
            className="no-spinner bg-transparent w-full text-white text-base font-sans focus:outline-none"
            type="number"
            value={amount}
            placeholder="amount"
            onChange={changeHandler}
          />
        </div>
        <div
          className="max-h-[300px] z-50 absolute border border-slate-500 rounded-lg bg-transparent mt-20 overflow-y-auto  px-4 flex flex-col justify-center items-center"
          style={{
            width: "45%",
            display: `${display}`,
            backgroundColor: "rgb(0,0,0,0.8)"
          }}
        >
          <div className="w-full">{node}</div>
        </div>
        <button className="rounded-full bg-fuchsia-800 hover:bg-fuchsia-700 text-lg text-semibold text-white px-2 py-2 m-5 w-40 " onClick={clickHandler} >
          send
        </button>
      </div>
      <div className="w-full h-full fixed flex flex-row justify-center items-center" style={{backgroundColor:"rgba(0,0,0,0.7)",display:fore?"flex":"none"}}>
          <div style={{display:load?"flex":"none"}}>
          <BiLoaderAlt color={"violet"} size={"50px"} className="rotate"/>
          </div>
          <div className="w-max h-max  px-12 py-5 flex flex-col justify-center items-center gap-2 m-5 rounded-md" style={{backgroundColor:"rgba(255,255,255,0.8",display:ack?"flex":"none"}}>
            <p className="text-purple-900 font-semibold text-lg font-mono ">{msg}</p>
            <button className="rounded-md bg-fuchsia-800 hover:bg-fuchsia-700 text-sm font-semibold text-white px-2 py-1 w-max" onClick={mCloser}>close</button>
          </div>
        </div>
    </div>
  );
};

export default SendMoney;
