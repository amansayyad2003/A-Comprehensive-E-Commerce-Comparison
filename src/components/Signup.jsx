import React, {useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Signup(props) {

    let {showAlert} = props

    const navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:"",password:"",name:""})

    const handleSubmit = async(e)=>{

      props.setProgress(20)

        e.preventDefault(); // To avoid page reloading

        let url = "http://localhost:3000/api/auth/createuser"


        props.setProgress(40)
        

  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({email:credentials.email,password:credentials.password,name:credentials.name}), 
  });

  props.setProgress(70)


   const json = await response.json(); 


  props.setProgress(100)

  if (json.success){
    

    navigate("/");

    localStorage.setItem("authtoken",json.authtoken)

    showAlert("User Created Successfully","success")

  }

  else{

    showAlert("Enter Valid Login Credentials","danger")


  }


    }


    const onChange = (e)=>{

        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container' style={{marginTop:'100px'}}>

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
