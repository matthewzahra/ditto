import {Routes, Route} from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"

function App() {

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