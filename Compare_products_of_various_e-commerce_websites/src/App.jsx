import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Productstate from '../context/products/Productstate'
import Login from './components/Login'
import Signup from './components/Signup'
import Alert from './components/Alert'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  const [alert,setAlert] = useState(null)

  const showAlert = (message,type)=>{

    console.log("Inside Show Alert")

      setAlert({message,type})

      setTimeout(()=>{

        setAlert(null)
      },1500)
  }

  return (
    <>
    {/* so that all states in product state can be accsessed by all the components wrapped inside it */}
    <Productstate> 
    <Router>

    <Navbar/>

    <Alert alert={alert}/>
    <Routes>
       
          <Route exact path="/" element={<Home alert={alert} showAlert={showAlert} />}></Route>
          <Route exact path="/login" element={<Login alert={alert} showAlert={showAlert} />}></Route>
          <Route exact path="/signup" element={<Signup alert={alert} showAlert={showAlert} />}></Route>

        </Routes>


    </Router>

    </Productstate>
     
    </>
  )
}

export default App
