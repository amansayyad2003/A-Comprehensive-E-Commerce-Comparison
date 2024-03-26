import React, { useContext, useState } from 'react';
import './searchBar.css';
import { json } from 'react-router-dom';
import productContext from '../../context/products/Productcontext';
import LoadingBar from 'react-top-loading-bar'
export default function SearchBar(props) {

  const [input,setInput] = useState("")
  const context = useContext(productContext)
  const {products,setProducts} = context 

  

  const onChange = (e)=>{

    // console.log(e)

    // setInput({...input,[e.target.name]:e.target.value})
    setInput(e)
    // fetchData(e)
  }

  const handleClick = async()=>{

    props.setProgress(20)

    let response = await fetch("http://localhost:3000/api/product")

    response = await response.json()

    props.setProgress(50)

    console.log(response)

    const results = response.mydata.filter((item)=>{
    
      return item.title.toLowerCase().includes(input.toLowerCase())
    })

    props.setProgress(70)

    console.log(results)

    setProducts(results)

    props.setProgress(100)

  }

  return (
    <div className="search-container">
      <div className="box">
        <input type="text" placeholder="What are you looking for..." value={input} onChange={(e)=>onChange(e.target.value)}/>
        <a href="#">
          <i className="fas fa-search" onClick={handleClick}></i>
        </a>
      </div>
    </div>
  );
}
