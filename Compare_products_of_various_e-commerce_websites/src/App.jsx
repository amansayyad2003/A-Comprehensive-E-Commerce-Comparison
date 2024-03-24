import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Productstate from '../context/products/Productstate'
import Login from './components/Login'
import Signup from './components/Signup'
import Alert from './components/Alert'
import SearchBar from './components/SearchBar'
import Display_Cart from './components/Display_Cart'
import Cartstate from '../context/cart/Cartstate'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  const [progress,setProgress] = useState(0)


  const [alert,setAlert] = useState(null)

  const showAlert = (message,type)=>{

    console.log("Inside Show Alert")

      setAlert({message,type})

      setTimeout(()=>{

        setAlert(null)
      },1000)
  }



  return (
    <>
    {/* so that all states in product state can be accsessed by all the components wrapped inside it */}

    <Productstate> 
      <Cartstate>
    <Router>

    <Navbar/>

    <LoadingBar
        color='#f11946'
        progress={progress}
  
      />

    <SearchBar progress={progress} setProgress={setProgress}/>

    

    <Alert alert={alert}/>
    <Routes>
       
          <Route exact path="/" element={<Home alert={alert} showAlert={showAlert}/>}></Route>

          <Route exact path="/login" element={<Login alert={alert} showAlert={showAlert} progress={progress} setProgress={setProgress}/>}></Route>
          <Route exact path="/signup" element={<Signup alert={alert} showAlert={showAlert} progress={progress} setProgress={setProgress}/>}></Route>
          <Route exact path="/displaycart" element={<Display_Cart alert={alert} showAlert={showAlert}/>}></Route>

        </Routes>


    </Router>
    </Cartstate>

    </Productstate>

     
    </>
  )
}

export default App
