import {Routes, Route} from "react-router-dom"
import {useEffect} from "react"

import API from "./core/dev"

// helper functions
import getCSRF from "./core/getCSRF"

// pages
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"



function App() {
  
  // creating csrf token
  useEffect(() => {
    getCSRF()
  }, [])

  // Creating routes to each page based on current url
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