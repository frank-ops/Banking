import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci"
import { BiLoaderAlt } from "react-icons/bi"
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
 

const Details = () => {
const [name,setName] = useState<string>("")
const [fixed,setFixed] = useState<number>(0)
const [saving,setSaving] = useState<number>(0)
const [load,setLoad] = useState<boolean>(false)
const user = useSelector((state: RootState) => state.user);
useEffect(()=>{
   setLoad(true)
    axios.post("http://localhost:8080/accounts/getDetails",
    {
     "name":user.name,
     "password":user.password
   } 
   ).then(
    (res)=>{
        setName(res.data.name)
        setFixed(res.data.fixed)
        setSaving(res.data.saving)
    }
   )
   setLoad(false)
},[])

const currencyModifier = (currency:number) =>{
  const formattedNumber = currency.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return formattedNumber.replace('₹', '₹ ')
}
  return (
    <div
      className="w-full h-full flex flex-col justify-start items-center py-7 px-3 rounded-lg "
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
     <CiUser size={"180px"} color={"#FF55BB"}/>
      <p className="text-3xl font-mono font-bold mt-6 " style={{ color: "#FF55BB" }}>
        Account details
      </p>
       <div className="w-1/3 h-max flex flex-row justify-start items-baseline py-5">
        <p className="text-xl font-mono font-bold mt-6 " style={{ color: "#FF55BB",whiteSpace:"nowrap" }}>
          Account Holder Name : 
        </p>
        <p className="text-lg text-white font-mono font-bold mt-4 ml-2" style={{whiteSpace:"nowrap"}}>
          {name}
        </p>
       </div>
       <div className="w-1/3 h-max flex flex-row justify-start items-baseline py-5">
        <p className="text-xl font-mono font-bold mt-4 " style={{ color: "#FF55BB",whiteSpace:"nowrap" }}>
          Fixed Deposit : 
        </p>
        <p className="text-lg text-white font-mono font-bold mt-4 ml-2 " style={{whiteSpace:"nowrap"}}>
          {currencyModifier(fixed)}
        </p>
       </div>
       <div className="w-1/3 h-max flex flex-row justify-start items-baseline py-5">
        <p className="text-xl font-mono font-bold mt-4 " style={{ color: "#FF55BB",whiteSpace:"nowrap" }}>
          Savings : 
        </p>
        <p className="text-lg text-white font-mono font-bold mt-4 ml-2 " style={{whiteSpace:"nowrap"}}>
          {currencyModifier(saving)}
        </p>
       </div>
       <div className="w-full h-full fixed flex flex-row justify-center items-center" style={{backgroundColor:"rgba(0,0,0,0.7)",display:load?"flex":"none"}}>
          <BiLoaderAlt color={"violet"} size={"50px"} className="rotate"/>
        </div>
    </div>
  )
}

export default Details