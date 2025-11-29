import React from "react";
import "./App.css";
import Header from "./components/header.jsx";
import Procurement from "./pages/procurement.jsx";
import Logistics from "./pages/logistics.jsx";
import {Routes, Route} from "react-router-dom";
import Contacts from "./pages/contacts.jsx";
function App() {

    return (
       <Routes>
           <Route path="/" element={<Header/>}></Route>
           <Route path="/procurement/" element={<Procurement/>}></Route>
           <Route path="/logistics/" element={<Logistics/>}></Route>
           <Route path="/contacts/" element={<Contacts/>}></Route>
       </Routes>

    )
}


export default App;