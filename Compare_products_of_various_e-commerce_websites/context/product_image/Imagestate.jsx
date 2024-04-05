import React, { useContext, useState,useEffect } from 'react'
import Imagecontext from './Imagecontext'
export default function Imagestate(props) {



  const [Image_url,setImage_url] = useState('')

  const [Title,setTitle] = useState('')

  



  return (
    <div>
        {/* If you wrap productContext image around any element then props.Children would appear there automatically */}
        <Imagecontext.Provider value={{Image_url,setImage_url,Title,setTitle}}>
            {props.children} 
        </Imagecontext.Provider>
    </div>
  )
}
