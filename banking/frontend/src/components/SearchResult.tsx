import React from 'react'

interface SearchProps{
    name:string,
    nameSetter:(arg:string)=>void
}

const SearchResult = ({name,nameSetter}:SearchProps) =>{
    return(
      <div className="w-full h-max flex rounded-md flex-row justify-center items-center hover:bg-fuchsia-500 border-slate-600 border-b p-2 mt-2 mb-2 cursor-pointer" style={{
        boxSizing:"border-box",
        backdropFilter:"blur(15px)"
      }} onClick={()=>{nameSetter(name)}} >
        <p className="text-sm font-normal font-mono text-white">{name}</p>
      </div>
    )
  }

export default SearchResult