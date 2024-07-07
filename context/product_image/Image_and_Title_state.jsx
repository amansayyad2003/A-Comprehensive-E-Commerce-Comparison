import React, { useState} from 'react'
import Image_and_Titlecontext from './Image_and_Title_context'
export default function Image_and_Titlestate(props) {



  const [Image_and_Title_url,setImage_and_Title_url] = useState('')

  const [Title,setTitle] = useState('')

  



  return (
    <div>
        {/* If you wrap productContext image around any element then props.Children would appear there automatically */}
        <Image_and_Titlecontext.Provider value={{Image_and_Title_url,setImage_and_Title_url,Title,setTitle}}>
            {props.children} 
        </Image_and_Titlecontext.Provider>
    </div>
  )
}
