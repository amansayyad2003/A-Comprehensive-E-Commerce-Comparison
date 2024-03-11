import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Display_Product from './components/Display_Product'
import Productstate from '../context/products/Productstate'
import Login from './components/Login'
import Signup from './components/Signup'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* so that all states in product state can be accsessed by all the components wrapped inside it */}
    <Productstate> 
    <Router>

    <Navbar/>

    <Routes>
       
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>

        </Routes>


    </Router>

    </Productstate>
     
    </>
  )
}

export default App
