import React from 'react'
import { Transaction } from './Transactions'

interface Props{
    transaction:Transaction
}

const TransactionTab = ({transaction}:Props) => {
    let color:string="green"
   if(transaction.status.search("Failed")>-1)
   {
      color="red"
   } 
  return (
    <div className="w-full grid rounded-lg grid-cols-5 border border-fuchsia-500 p-2.5 my-2 gap-5">
     <div className="w-full flex flex-row items-center justify-start pl-5 overflow-x-hidden">
      <p className="text-base text-cyan-500 font-mono">{transaction.id}</p>
     </div>
     <div className="w-full flex flex-row items-center justify-start pl-2 overflow-x-hidden wh-wrap">
      <p className="text-base text-cyan-500 font-mono">{transaction.sender_name}</p>
     </div>
     <div className="w-full flex flex-row items-center justify-start pl-2 overflow-x-hidden wh-wrap">
      <p className="text-base text-cyan-500 font-mono">{transaction.receiver_name}</p>
     </div>
     <div className="w-full flex flex-row items-center justify-start pl-2 overflow-x-hidden wh-wrap">
      <p className="text-base text-cyan-500 font-mono">{transaction.amount}</p>
     </div>
     <div className="w-full flex flex-row items-center justify-start overflow-x-hidden wh-wrap" >
      <p className={`text-base font-mono`} style={{color:color}}>{transaction.status}</p>
     </div>
    </div>
  )
}

export default TransactionTab