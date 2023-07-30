import React from 'react'
import RegistrationForm from './component/Registration'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alluser from './component/Alluser';
import Nav from './component/Nav';

function App() {
  return (
    <div>
       <Nav/><br/>
      <Routes>
       
        <Route path="/" element={<RegistrationForm />}/>
        <Route path="alluser" element={<Alluser/>} />
      </Routes>
    </div>
  )
}

export default App