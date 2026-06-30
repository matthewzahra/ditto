import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import API from "./core/dev"

// helper functions
import getCSRF from "./core/getCSRF"

// layouts
import LoggedOutLayout from "./layouts/LoggedOutLayout/LoggedOutLayout"
import LoggedInLayout from "./layouts/LoggedInLayout/LoggedInLayout"

// pages
import Login from "./pages/LoggedOutPages/Login/Login"
import LoggedOutHome from "./pages/LoggedOutPages/LoggedOutHome/LoggedOutHome"
import Logout from "./pages/LoggedInPages/Logout/Logout"
import Register from "./pages/LoggedOutPages/Register/Register"
import Home from "./pages/LoggedInPages/Home/Home"



function App() {
  
  // creating csrf token
  useEffect(() => {
    getCSRF()
  }, [])

  // Creating routes to each page based on current url
  return (
    <>
    <Routes>

      {/* Routes for pages with logged out layout */}
      <Route element={<LoggedOutLayout />}>
        <Route path="/" element={<LoggedOutHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Routes for pages with logged in layout */}
      <Route element={<LoggedInLayout />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
      </Route>
      
    </Routes>
    </>
  )
}

export default App