import React, { useContext, useEffect, useState } from 'react'
import Price_filter from './Price_filter';
import Modecontext from '../../context/mode/Modecontext';
export default function Display_User_Name(props) {

    const [username,setUserName] = useState('')

    const {mode,toggleMode}= useContext(Modecontext)


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
        // console.log(json.user.name);
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
      {/* style={{ marginRight: '10px' }} */}
      <h1 > 
        Hello, {username} <br />
        How can I help you today?
      </h1>
      {/* <Price_filter alert={props.alert} showAlert={props.showAlert} /> */}
    </div>
  </div>
    
  )
}
// import React, { useEffect,useState } from 'react';

// const DisplayUserName = () => {

//   const [username,setUserName] = useState('')

//   useEffect(() => {
//     document.getElementsByTagName("h1")[0].style.fontSize = "6vw";
//   }, []);

//     useEffect(() => {
//     const get_user = async () => {
//       const url = "http://localhost:3000/api/auth/getuser";
//       try {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "authtoken": localStorage.getItem("authtoken")
//           },
//         });
//         const json = await response.json();
//         console.log(json.user.name);
//         setUserName(json.user.name)
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     get_user();
//   }, []);


//   return (
//     <div style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
//       <h1 style={{
//         fontSize: '3rem',
//         marginTop: '45vh',
//         color: 'white',
//         fontFamily: 'Merienda',
//         textShadow: '0px 0px 20px #fff, 0px 0px 20px #CB1C8D'
//       }}>Hi {username?username:"Welcome to Compare Craft"}, <br />How can I help you today? </h1>
//     </div>
//   );
// };

// export default DisplayUserName;

