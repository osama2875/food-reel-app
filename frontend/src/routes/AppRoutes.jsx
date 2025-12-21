import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Home from '../pages/general/Home'
import CreateFoodPartner from '../pages/food-partner/CreateFoodPartner'
import Profile from '../pages/food-partner/Profile'
import Saved from '../pages/general/Saved' 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<PartnerRegister/>} />
        <Route path="/food-partner/login" element={<PartnerLogin/>} />
        <Route path="/food-partner/:id" element={<Profile/>} />
        <Route path="/create-food" element={<CreateFoodPartner/>} />
        <Route path='/food-partner/:profile' element={<Profile/>} />
        <Route path='/saved' element={<Saved/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
