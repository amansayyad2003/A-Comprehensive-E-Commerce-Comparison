import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import { json } from "react-router-dom";
import productContext from "../../context/products/Productcontext";
import LoadingBar from "react-top-loading-bar";
import Inputcontext from "../../context/searchBar/Inputcontext";
import Spinner from "./Spinner";
import loadingcontext from "../../context/Spinner/Loadingcontext";
import Clickcontext from "../../context/click/Clickcontext";
export default function SearchBar(props) {
  // const [input, setInput] = useState("");
  const loading_context = useContext(loadingcontext);
  const click_context = useContext(Clickcontext);
  const { Click, setClick } = click_context;
  const { loading, setLoading } = loading_context;
  const context = useContext(productContext);
  const { products, setProducts } = context;
  const { Input, setInput } = useContext(Inputcontext);

  const addNewProducts = (newProducts) => {
    setProducts([...products, ...newProducts]);
  };

  const fetchData = async (value, check) => {
    try {
      console.log("Inside fetchData");
      console.log("Printing value....");
      console.log(value);
      props.setProgress(20);

      const url = `http://localhost:3000/api/python?searchTerm=${encodeURIComponent(
        value
      )}`;

      props.setProgress(50);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Convert search term to JSON and send it as the query parameter
      });

      if (!response.ok) {
        throw new Error("Failed to execute Python script");
      }

      const result = await response.json();
      props.setProgress(70);
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
    // setInput(value);
    setClick(true);
    setLoading(true);
    fetchData(value);
  };

  const handleChange = (value) => {
    setInput(value);
    // fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="What are you looking for..."
        value={Input}
        onChange={(e) => handleChange(e.target.value, 0)}
      />
      <FaSearch id="search-icon" onClick={(e) => handleClick(Input, 1)} />
    </div>
  );
}
