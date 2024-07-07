import React, {useState} from 'react'
import Clickcontext from './Clickcontext'
export default function Clickstate(props) {



  const [Click,setClick] = useState(false)



  



  return (
    <div>
        {/* If you wrap productContext Click around any element then props.Children would appear there automatically */}
        <Clickcontext.Provider value={{Click,setClick}}>
            {props.children} 
        </Clickcontext.Provider>
    </div>
  )
}
