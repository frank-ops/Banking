import React, { ReactNode, useEffect, useState } from "react";
import TransactionTab from "./TransactionTab";
import axios from "axios";
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import {BiLoaderAlt} from "react-icons/bi"

export interface Transaction {
  id: number;
  sid: number;
  rid: number;
  sender_name: string;
  receiver_name: string;
  amount: number;
  status: string;
}

const Transactions = () => {
  const [allTransactions,setAllTransaction]=useState<Transaction[]>([])
  const [load,setLoad] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user);
  const [node,setNode] = useState<ReactNode>(
    allTransactions.map((t:Transaction)=>{
       return(<TransactionTab key={t.id} transaction={t}/>)
       })
  )
 useEffect(() => {
   setNode(
    allTransactions.map((t:Transaction)=>{
        return(<TransactionTab key={t.id} transaction={t}/>)
        })
   )
 }, [allTransactions])
 useEffect(()=>{
  setLoad(true)
  axios.get(`http://localhost:8080/transactions/getTransactions/${user.name}`).then(
    (res)=>{
        setAllTransaction(res.data)
    }
  )
  setLoad(false)
},[])
  return (
    <div
    className="w-full h-full flex flex-col justify-start items-center py-7 px-3 rounded-lg "
    style={{
      backgroundColor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(2px)",
    }}
  >
    <p className="text-3xl font-mono font-bold mt-6 " style={{ color: "#FF55BB" }}>
      All Transactions
    </p>
    <div className="w-[97%] max-h-[350px] flex flex-col mt-24 overflow-y-auto custom-scrollbar">
      <div className="w-11/12 absolute  justify-center items-center top-32 left-8 pb-4 border-b border-slate-800">
        <div className="w-full grid grid-cols-5">
            <div className="w-full flex flex-row justify-start align-center px-4">
                <p className="text-base text-white font-mono">Id</p>
            </div>
            <div className="w-full flex flex-row justify-start align-center px-4">
                <p className="text-base text-white font-mono">Sender</p>
            </div>
            <div className="w-full flex flex-row justify-start align-center px-4">
                <p className="text-base text-white font-mono">Receiver</p>
            </div>
            <div className="w-full flex flex-row justify-start align-center px-4">
                <p className="text-base text-white font-mono">Amount</p>
            </div>
            <div className="w-full flex flex-row justify-start align-center px-4">
                <p className="text-base text-white font-mono">Status</p>
            </div>
        </div>
      </div>
      <div>
        {
             node
        }
      </div>
    </div>
    <div className="w-full h-full fixed flex flex-row justify-center items-center" style={{backgroundColor:"rgba(0,0,0,0.7)",display:load?"flex":"none"}}>
          <div>
          <BiLoaderAlt color={"violet"} size={"50px"} className="rotate"/>
          </div>
      </div>
  </div>
 
  );
};

export default Transactions;
