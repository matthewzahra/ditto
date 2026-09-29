import { Routes, Route } from "react-router-dom"

// layouts
import LoggedOutLayout from "@/layouts/LoggedOutLayout/LoggedOutLayout"
import LoggedInLayout from "@/layouts/LoggedInLayout/LoggedInLayout"
import AboutLayout from "@/layouts/AboutLayout/AboutLayout"

// logged-out pages
import Login from "@/features/auth/pages/Login/Login"
import LoggedOutHome from "@/pages/LoggedOutPages/LoggedOutHome/LoggedOutHome"
import Register from "@/features/auth/pages/Register/Register"
import Verify from "@/features/auth/pages/Verify/Verify"
import ForgotPassword from "@/features/auth/pages/ForgotPassword/ForgotPassword"
import UpdatePassword from "@/features/auth/pages/UpdatePassword/UpdatePassword"

// logged-in pages
import Home from "@/pages/LoggedInPages/Home/Home"
import Inbox from "@/features/inbox/pages/Inbox/Inbox"
import Profile from "@/features/profile/pages/Profile/Profile"
import Quote from "@/features/quotes/pages/Quote/Quote"
import EditProfile from "@/features/profile/pages/EditProfile/EditProfile"
import RestaurantTracker from "@/features/restaurantTracker/pages/RestaurantTracker/RestaurantTracker"
import WorkoutTracker from "@/features/workoutTracker/pages/WorkoutTracker/WorkoutTracker"

// shared pages
import About from "@/features/about/pages/About/About"


import Tempwebcomp from "@/components/tempwebcomp/Tempwebcomp"

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
        <Route path="/home" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/restaurant-tracker" element={<RestaurantTracker />} />
        <Route path="/workout-tracker" element={<WorkoutTracker />} />
        <Route path="/temp" element={<Tempwebcomp />} />
      </Route>

      <Route element={<AboutLayout />}>
        <Route path="/about" element={<About />} />
      </Route>
      
    </Routes>
    </>
  )
}

export default App