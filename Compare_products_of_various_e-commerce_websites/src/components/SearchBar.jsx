import React, { useState } from 'react';
import './searchBar.css';
import { json } from 'react-router-dom';

export default function SearchBar() {

  const [input,setInput] = useState("")



  const fetchData = async(value)=>{

    let response = await fetch("https://jsonplaceholder.typicode.com/users")

    response = await response.json()

    const results = response.filter((user)=>{
      return user && user.name && user.name.toLowerCase().includes(value)
    })
    

    console.log(results)

  }

  const onChange = (e)=>{

    // setInput({...input,[e.target.name]:e.target.value})
    setInput(e)
    fetchData(e)
  }

  return (
    <div className="search-container">
      <div className="box">
        <input type="text" placeholder="Search..." value={input} onChange={(e)=>onChange(e.target.value)}/>
        <a href="#">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </div>
  );
}
