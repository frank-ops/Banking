import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from "./store/userSlice";
import {BiLoaderAlt} from "react-icons/bi"
import axios from "axios";


const Signin = () => {

  const navigate = useNavigate()  
  const dispatch =  useDispatch()
  const [icn, setIcn] = useState("/assets/eyeclosed.svg");
  const [type, setType] = useState<string>("password");
  const [name,setName] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [load,setLoad] = useState<boolean>(false)
  const [ack,setAck] = useState<boolean>(false)
  const [fore,setFore] = useState<boolean>(false)
  const changeType = () => {
    if (type === "password") {
      setType("text");
      setIcn("/assets/eye.svg");
    } else {
      setType("password");
      setIcn("/assets/eyeclosed.svg");
    }
  };

  const changeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
     if(event.target.placeholder=="Name")
     {
      setName(event.target.value)
     }
     else{
      setPassword(event.target.value)
     }
  }

const clickHandler = () =>{
  if(name.length>0 && password.length>0)
  {
    setFore(true)
    setLoad(true)
     axios.post("http://localhost:8080/accounts/getDetails",
     {
      "name":name,
      "password":password
    } 
    ).then(
      (res)=>{
        
         setLoad(false)
         if(res.data.id!=null){
          setFore(false)
          const user = {
            name:res.data.name,
            password:res.data.password,
            fixed:res.data.fixed,
            saving:res.data.saving
          }
          dispatch(setUser(user))
          navigate("/home")
         }
         else{
          setLoad(false)
          setAck(true)
         }
      }
      ).catch((err)=>{
        console.log(err)
      })
  }
}
const mCloser = () =>{
  setAck(false)
  setFore(false)
}
  return (
    <div className="w-96 flex flex-col justify-center items-center">
      <p className="text-4xl font-mono font-semibold py-6 text-fuchsia-500">
        Sign in
      </p>
      <div className=" w-10/12 border border-slate-400 rounded-full px-4 py-4 m-4">
        <input
          className="bg-transparent w-full text-white text-base font-sans focus:outline-none"
          type="text"
          value={name}
          placeholder="Name"
          onChange={changeHandler}
        />
      </div>
      <div className=" flex flex-row w-10/12 border border-slate-400 rounded-full px-4 py-4 m-4">
        <input
          className="bg-transparent w-full text-white text-base font-sans focus:outline-none"
          type={type}
          value={password}
          placeholder="Password"
          onChange={changeHandler}
        />
        <img className="w-5" src={icn} alt="icn1" onClick={changeType} />
      </div>
      <div className="flex flex-row justify-between items-center w-full m-4 px-4">
        <p
          className="text-left cursor-pointer underline underline-offset-1 text-base text-white w-1/2 m-5 focus:text-fuchsia-600"
          tabIndex={0}
          onClick={()=>{navigate("/signup")}}
        >
          create an account
        </p>
        <button className="rounded-full bg-fuchsia-800 hover:bg-fuchsia-700 text-xl text-semibold text-white px-2 py-2 m-4 w-28" onClick={clickHandler}>
          sign in
        </button>
      </div>
      <div className="w-screen h-[1000px] fixed flex flex-row justify-center items-start" style={{backgroundColor:"rgba(0,0,0,0.7)",display:fore?"flex":"none"}}>
          <div  style={{marginTop:"450px"}}>
          <BiLoaderAlt color={"violet"} size={"70px"} className="rotate" style={{display:load?"block":"none"}}/>
          <div className="w-max h-max  px-12 py-5 flex flex-col justify-center items-center gap-2 m-5 rounded-md" style={{backgroundColor:"rgba(255,255,255,0.8",display:ack?"flex":"none"}}>
            <p className="text-purple-800 font-semibold text-lg font-mono ">Invalid Credentials</p>
            <button className="rounded-md bg-fuchsia-800 hover:bg-fuchsia-700 text-sm font-semibold text-white px-2 py-1 w-max" onClick={mCloser}>close</button>
          </div>
          </div>
        </div>
    </div>
  );
};

export default Signin;
