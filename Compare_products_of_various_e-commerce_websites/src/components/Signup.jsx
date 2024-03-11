import React, { useContext, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import { useNavigate } from "react-router-dom";
export default function Login() {

    let context = useContext(productContext)

    const navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:"",password:"",name:""})

    const handleSubmit = async(e)=>{

        e.preventDefault(); // To avoid page reloading

        let url = "http://localhost:3000/auth/createuser"



        
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({email:credentials.email,password:credentials.password,name:credentials.name}), 
  });


   const json = await response.json(); 

  // console.log("About to print json after fetching loginuser url")

  //  console.log(json)

  if (json.success){

    navigate("/");

  }

  else{

    alert("Enter valid credentials")
  }


    }


    const onChange = (e)=>{

        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container'>

<form onSubmit={handleSubmit}>
       
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label" value={credentials.name}>Name</label>
  <input type="name" className="form-control" id="name" name='name' onChange={onChange} />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label" value={credentials.email}>Email address</label>
  <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label" value={credentials.password}>Password</label>
  <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
</div>
<div className="text-center"> {/* Centering the button */}
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                    </form> 
    </div>
  )
}
