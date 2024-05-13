import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import { json } from "react-router-dom";
import productContext from "../../context/products/Productcontext";
import LoadingBar from "react-top-loading-bar";
import Inputcontext from "../../context/searchBar/Inputcontext";
import Spinner from "./Spinner";
import loadingcontext from "../../context/Spinner/Loadingcontext";
import Clickcontext from "../../context/click/Clickcontext";
import { useNavigate } from "react-router-dom";
import './Dropdown.css'
export default function SearchBar(props) {
  const navigateTo = useNavigate();
  const loading_context = useContext(loadingcontext);
  const click_context = useContext(Clickcontext);
  const { Click, setClick } = click_context;
  const { loading, setLoading } = loading_context;
  const context = useContext(productContext);
  const { products, setProducts } = context;
  const { Input, setInput } = useContext(Inputcontext);
  const [history, setHistory] = useState([]);
  const [dropdown_suggestions, set_Dropdown_Suggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const add_to_history = async(value) => {


    try {
     
      const url = `http://localhost:3000/api/auth/store-history`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({query:value})

      });
      

      if (!response.ok) {
        throw new Error("Failed to add to history");
      }
 


      const result = await response.json();
 
      console.log("Result from store-history endpoint:", result);

     

    } catch (error) {
      console.error("Error:", error);
    }

  }

  const fetch_history = async(val) => {

    try {
     
      const url = `http://localhost:3000/api/auth/getuser`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
 


      const result = await response.json();
 
      console.log("Result from get-user endpoint:", result);

      const queries = result.user.history.map(item => item.query);

      console.log("Queries:", queries);

      setHistory(queries)


      if (val == 1){

         set_Dropdown_Suggestions(queries.slice(0, 5));
      }
     

    } catch (error) {
      console.error("Error:", error);
    }


  }


  const redirectToNewComponent = () => {
    navigateTo("/audio-page");
  };

  const fetchSuggestions = (value) => {
    console.log("Hell No")
    console.log(history)
    
    // If value is null or empty, set filteredSuggestions to history

  
    const filteredSuggestions = history.filter((search) =>
      search.toLowerCase().startsWith(value.toLowerCase())
    ).slice(0,5);
    console.log("Hell")
    console.log(filteredSuggestions)
    set_Dropdown_Suggestions(filteredSuggestions);
  };
  
  useEffect(()=>{

    {console.log("Inside useEffect hook")}

    fetch_history(1);



  },[])

  const fetchData = async (value) => {
    try {
      props.setProgress(20);
      props.setProgress(40);
      const url = `http://localhost:3000/api/python?searchTerm=${encodeURIComponent(
        value
      )}`;
      props.setProgress(60);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      props.setProgress(80);

      if (!response.ok) {
        throw new Error("Failed to execute Python script");
      }

      const result = await response.json();
      props.setProgress(100);
      console.log("Result from backend:", result["result"]);

      const dead = result["result"];
      console.log("Printing type of dead:", typeof dead);
      console.log("Original JSON string:", dead);

      const cleanedStr = dead.replace(/'/g, '"').replace(/,\s+/g, ",");
      console.log("Cleaned JSON string:", cleanedStr);

      const list = JSON.parse(cleanedStr);

      console.log("Parsed JSON data:", list);

      console.log("Printing type of list:", typeof list);

      setProducts(list);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (value) => {
    setClick(true);
    setLoading(true);
    fetchData(value);
    if (!(history.includes(value)))add_to_history(value);
    fetch_history();
  };

  const handleChange = (value) => {
    {console.log("Inside handleChange")}
    setInput(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (event) => {
    {console.log("Roman")}
    {console.log(event.key)}
    if (event.key === "Enter") {
      if (selectedSuggestionIndex !== -1) {
        // If a suggestion is selected, handle Enter key press
        const selectedSuggestion = dropdown_suggestions[selectedSuggestionIndex];
        handleSuggestionClick(selectedSuggestion);
      }
      setClick(true);
      setLoading(true);
      fetchData(Input);
     if (!(history.includes(Input))) add_to_history(Input);
      fetch_history();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "ArrowDown") {
      {console.log("Hey!")}
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, dropdown_suggestions.length - 1)
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    fetchData(suggestion);
    set_Dropdown_Suggestions([]); // Clear dropdown_suggestions after selection
  };

  

  return (
    <>
      <div className="input-wrapper">
      <div className="dropdown">

      {/* <div id="myDropdown" className={`dropdown-content ${showDropdown ? 'show' : ''}`}> */}
      <div id="myDropdown" className={`dropdown-content`}>
      
      {/* {filteredLinks.map((link, index) => (
          <a key={index} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))} */}
      {console.log("RVD")}
        {console.log(selectedSuggestionIndex)}
      {dropdown_suggestions.map((link, index) => (
        
          <a key={index} className={index === selectedSuggestionIndex ? "selected" : ""} onClick={() => handleSuggestionClick(link)} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </div>
    </div>
        <i
          className="fa-solid fa-microphone"
          onClick={redirectToNewComponent}
        ></i>

        <input
          placeholder="What are you looking for..."
          value={Input}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e.target.value, 0)}
        />
        <FaSearch id="search-icon" onClick={(e) => handleClick(Input)} />

        {/* <div className="dropdown">
          {dropdown_suggestions.length > 0 && (
            <ul className="dropdown_suggestions">
              {dropdown_suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </>
  );
}