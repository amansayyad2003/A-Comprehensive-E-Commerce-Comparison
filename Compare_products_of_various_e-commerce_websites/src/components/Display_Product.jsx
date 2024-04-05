import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import Display_Cart from './Display_Cart';
import CartContext from '../../context/cart/Cartcontext';







export default function Display_product(props) {
  {console.log("Trying to print image of product inside Display_prdoduct")}
  {console.log(props.product.image_url)}
  const [image, setImage] = useState("");
  const context = useContext(CartContext);
  const { fetch_cart, addToCart, deleteFromCart } = context;
  const { showAlert } = props;

  const addtoCart = () => {
    addToCart(props.product);
    showAlert("Item Added to Cart Successfully", "success");
  };

  const deletefromCart = (id) => {
    deleteFromCart(id);
    showAlert("Item Deleted From Cart Successfully", "success");
  };



  return (
    <div className="product-container">

     
      
      <div className="image-container">
        <img src={props.product.image_url} width={470} height={300} alt={props.product.title} />
      </div>
      <div className="info-container">
        <h5 className="card-title">{props.product.title}</h5>
        <p>₹{props.product.price}</p>
        {/* <p className="card-text">{props.product.description}</p> */}
        <p>
          <Link to="/product-comparison" className="btn btn-primary">View Product Comparison</Link>
        </p>
        <div>
          <div className="btn btn-primary" onClick={props.cart_action === "Add to Cart" ? () => { addtoCart() } : () => { deletefromCart(props.product._id) }}>{props.cart_action}</div>
        </div>
      </div>
    </div>
    
  );
}
