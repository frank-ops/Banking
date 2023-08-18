import React from "react";
import "./App.css";
import CoverPage from "./components/CoverPage";
import CarouselCustom from "./components/Carasoul";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Intro from "./components/Intro";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AddMoney from "./components/AddMoney";
import SendMoney from "./components/SendMoney";
import Transactions from "./components/Transactions";



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoverPage node={<Intro/>}/>} />
          <Route path="/signin" element={<CoverPage node={<Signin/>}/>} />
          <Route path="/signup" element={<CoverPage node={<Signup/>}/>} />
          <Route path="/home" element={<Home node={<CarouselCustom/>} />} />
          <Route path="/addmoney" element={<Home node={<AddMoney/>} />} />
          <Route path="/sendmoney" element={<Home node={<SendMoney/>} />} />
          <Route path="/transactions" element={<Home node={<Transactions/>} />} />
          <Route path="/accdetails" element={<Home node={<Details/>} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
