import React, { useContext, useState,useEffect } from 'react'
import Cartcontext from './Cartcontext'
export default function Cartstate(props) {



  const [cart,setCart] = useState([])

   const fetch_cart = async()=>{
    let url = "http://localhost:3000/api/cart/displaycart"

    try{
      const response = await fetch(url, {

        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authtoken")
        },
        
      });
      const user_cart = await response.json(); // parses JSON response into native JavaScript objects
      console.log("Printing cart after fetch cartAPI call")
      console.log(user_cart)
      if (user_cart.success)  setCart(user_cart.cart)
      else console.log("API CALL UNSUCCESSFUL!")
     
    }catch(error){
      console.json({error:error.message})
    }

  }

  const addToCart = async(product)=>{

    let url = "http://localhost:3000/api/cart/addtocart"

    
    try{
      const response = await fetch(url, {

        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authtoken")
        },

        body: JSON.stringify({title:product.title,description:product.description,image:product.image,price:product.price}),
        
      });
      const added_item = await response.json(); // parses JSON response into native JavaScript objects
      console.log("Printing added item after API call")
      console.log(added_item)
      if (added_item.success)  setCart(cart.concat(added_item.cart))
      else console.log("API CALL UNSUCCESSFUL!")

    }catch(error){
      console.json({error:error.message})
    }

  }

  const deleteFromCart = async(id)=>{


    
    let url = `http://localhost:3000/api/cart/deletefromcart/${id}`

    
    try{
      const response = await fetch(url, {

        method: "DELETE",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authtoken")
        },
        
      });
      const deleted_product = await response.json(); // parses JSON response into native JavaScript objects

      console.log(deleted_product)

      if (deleted_product.success){


        const newCart = cart.filter((item)=>{

          return item._id!=id
        })
  
        setCart(newCart)
      }

      
     
    }catch(error){
      console.json({error:error.message})
    }

  }


    




  return (
    <div>
        {/* If you wrap productContext image around any element then props.Children would appear there automatically */}
        <Cartcontext.Provider value={{cart,fetch_cart,addToCart,deleteFromCart}}>
            {props.children} 
        </Cartcontext.Provider>
    </div>
  )
}
