import React, { useEffect, useState } from 'react'

export default function Display_User_Name() {

    const [username,setUserName] = useState('')


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
        console.log(json.user.name);
        setUserName(json.user.name)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    get_user();
  }, []);


  return (
    <div>

<h1>
Hello, {username} <br />
 How can I help you today?
</h1>
      
    </div>
  )
}
