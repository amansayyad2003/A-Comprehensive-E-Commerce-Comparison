import React, { useContext, useState } from 'react'
import { Link
} from "react-router-dom";
import Display_Cart from './Display_Cart';
import CartContext from '../../context/cart/Cartcontext'
export default function Display_product(props) {

  const [image,setImage] = useState("")

  const context = useContext(CartContext)



  const {fetch_cart,addToCart,deleteFromCart} = context

  const {showAlert} = props
  

  const addtoCart = ()=>{

    addToCart(props.product)

    showAlert("Item Added to Cart Successfully","success")


  }

  const deletefromCart = (id)=>{

    deleteFromCart(id)

    showAlert("Item Deleted From Cart Successfully","success")
  }


  // const convertToBase64 = (e)=>{

  //   console.log(e)

  
  //   const reader = new FileReader();

  //   reader.readAsDataURL(e.target.files[0]);

  //   reader.onload = ()=>{
  //     console.log("Printing....")
  //     console.log(reader.result);
  //     setImage(reader.result)
  //   }

  //   reader.onerror = error => {
  //     console.log("Error: ",error);
  //   }
  // } 

// Convert the binary data to base64
// const base64Image = props.product.image ? `data:${props.product.image.contentType};base64,${arrayBufferToBase64(props.product.image.data.buffer)}` : '';

// console.log(base64Image)

  return (
    <div>
      
    <div className="card">
        <img src={props.product.image} alt={props.product.title} />
        <div className="card-body">
            <h5 className="card-title">{props.product.title}</h5>
            <p>₹{props.product.price}</p>
            <p className="card-text">{props.product.description}</p>
            <p><Link to="/TODO" className="btn btn-primary">Go to the Website of this product</Link></p>
            <p><div className="btn btn-primary" onClick={props.cart_action==="Add to Cart"?()=>{addtoCart()}:()=>{deletefromCart(props.product._id)}}>{props.cart_action}</div></p>
        </div>
    </div>
</div>
  )
}
