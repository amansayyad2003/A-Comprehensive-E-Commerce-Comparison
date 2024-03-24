import React, { useContext, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default function Login(props) {

    let product_context = useContext(productContext)


    let {showAlert} = props

    const navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:"",password:""})

    const handleSubmit = async(e)=>{

      props.setProgress(20)

        e.preventDefault(); // To avoid page reloading

        let url = "http://localhost:3000/api/auth/loginuser"

        props.setProgress(40)



        
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({email:credentials.email,password:credentials.password}), 
  });

  props.setProgress(70)


   const json = await response.json(); 

  // console.log("About to print json after fetching loginuser url")

  //  console.log(json)

  props.setProgress(100)

  if (json.success){

    showAlert("User Logged In Successfully","success")
    localStorage.setItem("authtoken",json.authtoken)
    navigate("/");


  }

  else{

    showAlert("Enter Valid Login Credentials","danger")
  }


    }


    const onChange = (e)=>{

        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container'>

<form onSubmit={handleSubmit}>
       
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
