import React, { useState,useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'
import { json } from 'react-router-dom';
import productContext from '../../context/products/Productcontext';
import LoadingBar from 'react-top-loading-bar'
import Inputcontext from '../../context/searchBar/Inputcontext';
export default function SearchBar(props) {
  // const [input, setInput] = useState("");
  const context = useContext(productContext)
  const {products,setProducts} = context 
  const {Input,setInput} = useContext(Inputcontext)


  const fetchData = async(value) => {
    props.setProgress(20)

    let response = await fetch("http://localhost:3000/api/product")

    response = await response.json()

    props.setProgress(50)

    console.log(response)

    const results = response.mydata.filter((item)=>{
    
      return item.title.toLowerCase().includes(Input.toLowerCase())
    })

    props.setProgress(70)

    console.log(results)

    setProducts(results)

    props.setProgress(100)
  };

  const handleClick = (value)=>{

    fetchData(value);
  }

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
   
  };

  return (
    <div className='input-wrapper'>
      <FaSearch id="search-icon" onClick={(e) => handleClick(e.target.value)}/>
      <input
        placeholder="What are you looking for..."
        value={Input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
