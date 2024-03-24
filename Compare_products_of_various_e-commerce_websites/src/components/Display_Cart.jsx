import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../context/cart/Cartcontext'
import Display_product from './Display_Product'
import { useNavigate } from "react-router-dom";
export default function Display_Cart(props) {
  const context = useContext(CartContext)
  const { fetch_cart,cart } = context
  const navigate = useNavigate();

  useEffect(()=>{

    if (localStorage.getItem("authtoken"))  fetch_cart();

    else{

      props.showAlert("You have to Login to View Your Cart!","danger")

      navigate("/login")
    }

   
  },[])

  return (
    <div>
      {cart.length > 0 && <h1 className="text-center my-2">Your Cart</h1>}

      <div className="row" style={{ marginTop: '20px' }}>
        {cart.length === 0 ? (
          <h3 className="text-center my-3">Your Cart is Empty</h3>
        ) : (
          cart.map((product) => {
            return (
              <div className="col-md-4 my-2" key={product.id}>
                <Display_product product={product} cart_action={"Delete from Cart"} showAlert={props.showAlert}/>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
