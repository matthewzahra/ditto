import { Routes, Route } from "react-router-dom"

import API from "./core/API"

// layouts
import LoggedOutLayout from "./layouts/LoggedOutLayout/LoggedOutLayout"
import LoggedInLayout from "./layouts/LoggedInLayout/LoggedInLayout"

// logged-out pages
import Login from "./pages/LoggedOutPages/Login/Login"
import LoggedOutHome from "./pages/LoggedOutPages/LoggedOutHome/LoggedOutHome"
import Register from "./pages/LoggedOutPages/Register/Register"
import Verify from "./pages/LoggedOutPages/Verify/Verify"
import ForgotPassword from "./pages/LoggedOutPages/ForgotPassword/ForgotPassword"
import UpdatePassword from "./pages/LoggedOutPages/UpdatePassword/UpdatePassword"

// logged-in pages
import Home from "./pages/LoggedInPages/Home/Home"
import Logout from "./pages/LoggedInPages/Logout/Logout"




function App() {
  

  // Creating routes to each page based on current url
  return (
    <>
    <Routes>

      {/* Routes for pages with logged out layout */}
      <Route element={<LoggedOutLayout />}>
        <Route path="/" element={<LoggedOutHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
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