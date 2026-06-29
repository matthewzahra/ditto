import {Routes, Route} from "react-router-dom"
import {useEffect} from "react"

import API from "./core/dev"

import getCSRF from "./core/getCSRF"

import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"



function App() {
  useEffect(() => {
    getCSRF();
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App