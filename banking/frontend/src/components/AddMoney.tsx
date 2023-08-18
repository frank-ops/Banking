import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from './store/store'
import { useSelector } from 'react-redux'
import {BiLoaderAlt} from "react-icons/bi"

const AddMoney = () => {
    
    const [fixed,setFixed] = useState<string|number>("")
    const [saving,setSaving] = useState<string|number>("")
    const [fore,setFore] = useState<boolean>(false)
    const [load,setLoad] = useState<boolean>(false)
    const [ack,setAck] = useState<boolean>(false)
    const [msg,setMsg] = useState<string>("")
    const user = useSelector((state: RootState) => state.user);
    const changeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        if(event.target.placeholder=="Fixed Deposit"){
            setFixed(event.target.value)
        }
        else{
            setSaving(event.target.value)
        }
    }

    const clickHandler = () =>{
     if(fixed!="0" && saving!="0" && fixed!="" && saving!=""){
      setFore(true)
      setLoad(true)
      axios.put("http://localhost:8080/accounts/updateAccount",{
        "name":user.name,
        "amount":parseInt(fixed.toString())+parseInt(saving.toString()),
        "fixed":parseInt(fixed.toString()),
        "saving":parseInt(saving.toString())
      }).then((res)=>{
        if(res.data==="account updated Successfully")
        {
          setFixed("")
          setSaving("")
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
        Add Money
      </p>
      <div className="w-full h-full flex flex-col justify-start items-center mt-20 gap-6">
      <div className=" flex flex-row justify-center items-center w-1/2 border border-slate-400 rounded-full px-12 py-4 m-4 gap-4">
          <input
            className="no-spinner bg-transparent w-full text-white text-base font-sans focus:outline-none"
            type="number"
            value={fixed}
            placeholder="Fixed Deposit"
            onChange={changeHandler}
          />
        </div>
        <div className=" flex flex-row justify-center items-center w-1/2 border border-slate-400 rounded-full px-12 py-4 m-4 gap-4">
          <input
            className="no-spinner bg-transparent w-full text-white text-base font-sans focus:outline-none"
            type="number"
            value={saving}
            placeholder="savings"
            onChange={changeHandler}
          />
        </div>
        
        <button className="rounded-full bg-fuchsia-800 hover:bg-fuchsia-700 text-lg text-semibold text-white px-2 py-2 m-5 w-40" onClick={clickHandler}>
          Add
        </button>
      </div>
      <div className="w-full h-full fixed flex flex-row justify-center items-center" style={{backgroundColor:"rgba(0,0,0,0.7)",display:fore?"flex":"none"}}>
          <div style={{display:load?"flex":"none"}}>
          <BiLoaderAlt color={"violet"} size={"50px"} className="rotate"/>
          </div>
          <div className="w-max h-max  px-12 py-5 flex flex-col justify-center items-center gap-2 m-5 rounded-md" style={{backgroundColor:"rgba(255,255,255,0.8",display:ack?"flex":"none"}}>
            <p className="text-purple-800 font-semibold text-lg font-mono ">{msg}</p>
            <button className="rounded-md bg-fuchsia-800 hover:bg-fuchsia-700 text-sm font-semibold text-white px-2 py-1 w-max" onClick={mCloser}>close</button>
          </div>
        </div>
    </div>
  )
}

export default AddMoney