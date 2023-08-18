import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {BiLoaderAlt} from "react-icons/bi"
import { useDispatch } from 'react-redux';
import { setUser } from "./store/userSlice";

const Signup = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate();
    const [names,setNames] = useState<string[]>([])
    const [icn,setIcn] = useState("/assets/eyeclosed.svg");
    const [type,setType] = useState<string>("password")
    const [name,setName] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [cpassword,setCpassword] = useState<string>("")
    const [check1,setCheck1] = useState<boolean>(true)
    const [check2,setCheck2] = useState<boolean>(true)
    const [load,setLoad] = useState<boolean>(false)
    useEffect(()=>{
      axios.get("http://localhost:8080/accounts/getAllAccountHolders").then(
       (res)=>{
         setNames(res.data)
       }
      )
    },[]) 
    const changeType = () =>{
       if(type==="password"){
            setType("text")
            setIcn("/assets/eye.svg")
       }
       else{
            setType("password")
            setIcn("/assets/eyeclosed.svg")
       }
    }
  const nameChecker = (input:string) =>{
     if(names.includes(input))
     {
      return false;
     }
     return true;
  }
  const clickHandler = () =>{
    if(check1&&check2&&password.length>0&&name.length>0&&cpassword.length>0)
    {
      setLoad(true)
      axios.post("http://localhost:8080/accounts/addAccount",
      {
        "name":name,
        "password":password,
        "amount":0,
        "fixed":0,
        "saving":0
      }
      ).then((res)=>{
          const data={
            "name":name,
            "password":password,
            "fixed":0,
            "saving":0
          }
          dispatch(setUser(data))
          setLoad(false)
          navigate("/home")
      })
    }
  }
  const changeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    if(event.target.placeholder=="Name")
    {
          setName(event.target.value);
          setCheck1(nameChecker(event.target.value));
    }
    else if(event.target.placeholder=="Password")
    {
      setPassword(event.target.value)
    }
    else{
      setCpassword(event.target.value)
      if(event.target.value!=password)
      {
        setCheck2(false)
      }
      else{
        setCheck2(true)
      }
    }
  }


  return (
    <div className="w-96 flex flex-col justify-center items-center">
     <p
        className="text-4xl font-mono font-semibold py-6 text-fuchsia-500"
      >
        Sign up
      </p>
        <div className=" w-10/12 border border-slate-400 rounded-full px-4 py-4 m-4" >
        <input className="bg-transparent w-full text-white text-base font-sans focus:outline-none" type="text" value={name} placeholder="Name" onChange={changeHandler} />
        </div>
        <div className="fixed top-[36%]  left-[17%] font-mono text-xs text-red-500" style={{display:check1?"none":"block"}}>name already exists</div>
        <div className=" flex flex-row w-10/12 border border-slate-400 rounded-full px-4 py-4 m-4" >
        <input className="bg-transparent w-full text-white text-base font-sans focus:outline-none" type={type} value={password} placeholder="Password"  onChange={changeHandler} />
        <img className="w-5" src={icn} alt="icn1" onClick={changeType} /> 
        </div>
        <div className=" flex flex-row w-10/12 border border-slate-400 rounded-full px-4 py-4 m-4" >
        <input className="bg-transparent w-full text-white text-base font-sans focus:outline-none" type="password" value={cpassword} placeholder="Confirm Password" onChange={changeHandler} />
        </div>
        <div className="fixed top-[70%]  left-[17%] font-mono text-xs text-red-500" style={{display:check2?"none":"block"}} >passwords are not matching</div>
        <div className="flex flex-row justify-between items-center w-full m-4 px-4">
        <p
  className="text-left cursor-pointer underline underline-offset-1 text-base text-white w-1/3 m-5 focus:text-fuchsia-600"
  tabIndex={0}
  onClick={()=>{navigate("/signin")}}
>
  already have an account
</p>
        <button className="rounded-full bg-fuchsia-800 hover:bg-fuchsia-700 text-xl text-semibold text-white px-2 py-2 m-4 w-28" onClick={clickHandler}>
          submit
        </button>
       
        </div>
        <div className="w-screen h-[1000px] fixed flex flex-row justify-center items-start" style={{backgroundColor:"rgba(0,0,0,0.5)",display:load?"flex":"none"}}>
          <div  style={{marginTop:"450px"}}>
          <BiLoaderAlt color={"violet"} size={"70px"} className="rotate"/>
          </div>
        </div>
    </div>
  )
}

export default Signup