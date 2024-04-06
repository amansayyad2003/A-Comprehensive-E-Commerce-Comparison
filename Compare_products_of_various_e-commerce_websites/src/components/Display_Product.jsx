import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Display_Cart from "./Display_Cart";
import CartContext from "../../context/cart/Cartcontext";

import Product_Comparison_Page from "./Product_Comparison_Page";

import Imagecontext from "../../context/product_image/Imagecontext";
import productContext from "../../context/products/Productcontext";
import similarproductContext from "../../context/SimilarProductContext/Similarproductcontext";
import loadingcontext from '../../context/Spinner/Loadingcontext';
export default function Display_product(props) {
  {console.log("INSIDE Display_product!!!")}
  {console.log("About to print product inside!!! Display_Product.jsx")}
  {console.log(props.product)}
  
  const loading_context = useContext(loadingcontext)
  const {loading,setLoading} = loading_context

  const [image, setImage] = useState("");
  const context = useContext(CartContext);
  const { fetch_cart, addToCart, deleteFromCart } = context;
  const { showAlert } = props;
  const image_url_context = useContext(Imagecontext);
  const { Image_url, setImage_url, Title, setTitle } = image_url_context;
  const simiProdcontext = useContext(similarproductContext);
  const { similar_products, setSimilarProducts } = simiProdcontext;

  const addtoCart = () => {
    addToCart(props.product);
    showAlert("Item Added to Cart Successfully", "success");
  };

  const deletefromCart = (id) => {
    deleteFromCart(id);
    showAlert("Item Deleted From Cart Successfully", "success");
  };

  const fetchData = async (product, check) => {
    try {
      setLoading(true)
      console.log("Inside Fetch Data similar product");
      // props.setProgress(20)

      const url = `http://localhost:3000/api/simproduct?searchTerm=${encodeURIComponent(
        product
      )}`;

      // props.setProgress(50)

      console.log("Product: " + product);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: product,
        // Convert search term to JSON and send it as the query parameter
      });

      // console.log("After Fetching")
      // console.log("Response SIMILAR PRODUCT: " + response)

      if (!response.ok) {
        throw new Error("Failed to execute Python script");
      }

      const result = await response.json();
      // props.setProgress(70)
      console.log("Result from backend:", result["result"]);

      const dead = result["result"];
      //     console.log("Printing type of dead:", typeof dead);
      //   console.log("Original JSON string:", dead);

      const cleanedStr = dead.replace(/'/g, '"').replace(/,\s+/g, ",");
      //     console.log("Cleaned JSON string:", cleanedStr);

      console.log(cleanedStr);
      const list = JSON.parse(cleanedStr);

      console.log("Parsed JSON data:", list);

      //   console.log("Printing type of list:", typeof list);

      setSimilarProducts(list);

      setLoading(false)


     

      //   props.setProgress(100)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='product-container' style={{ display: 'flex', width: '1100px', height: '200px' }}>
      <div className='image-container' style={{ height: '100%', width: '30%' }}>
        <img src={props.product.image_url} alt={props.product.title} style={{ height: '100%', width: 'auto' }} />
      </div>
      <div className='info-container' style={{ marginLeft: '20px', width: '70%' }}>
        <div className='card-title'><h3>{props.product.title}</h3></div>
        <p style={{ fontSize: '1.2em', marginTop: '15px' }}><h3> ₹{props.product.price}</h3></p>
        <p style={{ marginTop: '30px' }}>
          <Link
            to='/product-comparison'
            className='btn btn-primary'
            onClick={() => {
              setImage_url(props.product.image_url);
              setTitle(props.product.title);
              fetchData(JSON.stringify(props.product));
            }}
          >
            View Product Comparison
          </Link>
        </p>
        <div style={{ marginTop: '20px' }} className='btn btn-primary' onClick={props.cart_action === 'Add to Cart' ? () => { addtoCart(); setImage_url(props.product.image_url); setTitle(props.product.title); } : () => { deletefromCart(props.product._id); }}>
          {props.cart_action}
        </div>
      </div>
    </div>
  );
  
}
