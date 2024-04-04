import React, {useState } from 'react'
import Inputcontext from './Inputcontext'
export default function Inputstate(props) {



  const [Input,setInput] = useState('')

   


  return (
    <div>
        {/* If you wrap productContext image around any element then props.Children would appear there automatically */}
        <Inputcontext.Provider value={{Input,setInput}}>
            {props.children} 
        </Inputcontext.Provider>
    </div>
  )
}
