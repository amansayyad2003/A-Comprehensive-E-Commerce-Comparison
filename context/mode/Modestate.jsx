import React, {useState} from 'react'
import Modecontext from './Modecontext'
export default function Modestate(props) {



  const [mode,setMode] = useState('light')

  const toggleMode = ()=>{

    if (mode === 'light'){
        console.log("Changing mode to dark")
        setMode('dark')
        document.body.style.backgroundColor = '#042743'
        // document.body.style.backgroundColor = 'grey'
    }

    else{
      console.log("Changing mode to light")
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }

}



  



  return (
    <div>
        {/* If you wrap productContext Mode around any element then props.Children would appear there automatically */}
        <Modecontext.Provider value={{mode,toggleMode}}>
            {props.children} 
        </Modecontext.Provider>
    </div>
  )
}
