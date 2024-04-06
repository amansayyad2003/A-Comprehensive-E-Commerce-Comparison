import React, {useState } from 'react'
import loadingcontext from './Loadingcontext'
export default function loadingstate(props) {



  const [loading,setLoading] = useState(false)

   


  return (
    <div>
    
        <loadingcontext.Provider value={{loading,setLoading}}>
            {props.children} 
        </loadingcontext.Provider>
    </div>
  )
}
