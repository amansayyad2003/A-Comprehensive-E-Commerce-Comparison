import React, { useContext, useEffect, useState } from 'react'
import Modecontext from '../../context/mode/Modecontext';
export default function Display_User_Name() {

    const [username,setUserName] = useState('')

    const {mode}= useContext(Modecontext)


  useEffect(() => {
    const get_user = async () => {
      const url = "http://localhost:3000/api/auth/getuser";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken")
          },
        });
        const json = await response.json();
        setUserName(json.user.name)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    get_user();
  }, []);


  return (
    <div className='display-username-container' style={{ textAlign: 'center', marginTop: '10px',color:mode==='dark'?'white':'black'}}>
    <div>
      {username?<h1 > 
        Hello, {username} <br />
        How can I help you today?
      </h1>:<h1 > 
        Welcome to Compare Craft, <br />
        How can I help you today?
      </h1>}
      
    </div>
  </div>
    
  )
}

