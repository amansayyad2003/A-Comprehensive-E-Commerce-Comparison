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

  const addNewProducts = (newProducts) => {
    setProducts([...products, ...newProducts]);
  };


  const fetchData = async(value,check) => {
    props.setProgress(20)


    try {

      const url = `http://localhost:3000/api/python?searchTerm=${encodeURIComponent(value)}`

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          // Convert search term to JSON and send it as the query parameter
          
      });

      if (!response.ok) {
          throw new Error('Failed to execute Python script');
      }

      const result = await response.json();
      console.log('Result from backend:', result['result']);
      props.setProgress(70)

      // addNewProducts(result['result'])
      
    // setProducts(result['result'])

      const dead = result['result']
      console.log("Printing type of dead:", typeof dead);
    console.log("Original JSON string:", dead);
  
      const cleanedStr = dead.replace(/'/g, '"').replace(/,\s+/g, ',');
      console.log("Cleaned JSON string:", cleanedStr);

    const list = JSON.parse(cleanedStr);
    console.log("Parsed JSON data:", list);

    console.log("Printing type of list:", typeof list);

    setProducts(list)

    

  } catch (error) {
      console.error('Error:', error);
  }

    
    // response = await response.json()
    // console.log(response)

    props.setProgress(50)

    // console.log("About to print response")

    // console.log(response)

    // console.log("printed response")


    // const results = response.mydata.filter((item)=>{
    
    //   return item.title.toLowerCase().includes(Input.toLowerCase())
    // })



    // console.log(results)


    // props.setProgress(100)
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
      <FaSearch id="search-icon" onClick={(e) => handleClick(e.target.value,1)}/>
      <input
        placeholder="What are you looking for..."
        value={Input}
        onChange={(e) => handleChange(e.target.value,0)}
      />
    </div>
  )
}
