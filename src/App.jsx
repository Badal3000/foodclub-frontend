// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import FoodItemComponent from './components/Fooditem/FoodItemDetails'

function App() {  
  return (
    <>
        <Routes>
          <Route path="/" 
          element=
          {<><Header /> 
           <Home /> 
           <Footer /></>} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path = '/food/:id' element={<FoodItemComponent />} />
        </Routes>      
    </>
  )
}

function AppWrapper () {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;
