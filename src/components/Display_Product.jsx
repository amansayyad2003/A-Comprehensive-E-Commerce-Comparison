import React, {useContext} from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/cart/Cartcontext";
import Modecontext from '../../context/mode/Modecontext';
import Imagecontext from "../../context/product_image/Image_and_Title_context";
import similarproductContext from "../../context/SimilarProductContext/Similarproductcontext";
import loadingcontext from '../../context/Spinner/Loadingcontext';
export default function Display_product(props) {

  const {mode}= useContext(Modecontext)
  
  const loading_context = useContext(loadingcontext)
  const {setLoading} = loading_context
  const context = useContext(CartContext);
  const {addToCart, deleteFromCart } = context;
  const { showAlert } = props;
  const image_url_context = useContext(Imagecontext);
  const {setImage_url, setTitle } = image_url_context;
  const simiProdcontext = useContext(similarproductContext);
  const {setSimilarProducts } = simiProdcontext;

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

      const url = `http://localhost:3000/api/simproduct?searchTerm=${encodeURIComponent(
        product
      )}`;


      console.log("Product: " + product);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (!response.ok) {
        throw new Error("Failed to execute Python script");
      }

      const result = await response.json();

      console.log("Result from backend:", result["result"]);

      const required_result = result["result"];
  
      const cleanedStr = required_result
        .replace(/'/g, '"')
        .replace(/,\s+/g, ",")
        .replace("None", "null");


      console.log(cleanedStr);
      const dictionary = JSON.parse(cleanedStr);

      console.log("Parsed JSON data:", dictionary);

      setSimilarProducts(dictionary);

      setLoading(false)

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='product-container' style={{ display: 'flex', width: '1100px', height: '200px',color:mode==='dark'?'white':'black' }}>
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
