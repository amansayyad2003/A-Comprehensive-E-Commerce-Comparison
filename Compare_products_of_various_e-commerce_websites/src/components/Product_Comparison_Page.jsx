import React, { useContext } from "react";
import "./styles.css"; // Assuming your CSS file is in the same directory
import { Link } from "react-router-dom";
import Imagecontext from "../../context/product_image/Imagecontext";
import Display_product from "./Display_Product";
import productContext from "../../context/products/Productcontext";
import Product from "./Product";
import similarproductContext from "../../context/SimilarProductContext/Similarproductcontext";
import loadingcontext from "../../context/Spinner/Loadingcontext";
import Modecontext from '../../context/mode/Modecontext';
import Spinner from "./Spinner";

function Product_Comparison_Page(props) {
  
  const loading_context = useContext(loadingcontext);
  const { loading } = loading_context;
  const context1 = useContext(similarproductContext);
  const { similar_products } = context1;

  const image_url_context = useContext(Imagecontext);
  const { Image_url, Title } = image_url_context;
  const {mode,toggleMode}= useContext(Modecontext)

  {console.log("About to print product inside Product Comparison Page")}
  {console.log(similar_products)} 

  return (
    <>
      <div style={{ textAlign: "center",color:mode==='dark'?'white':'black'}}>
        <h2 style={{ marginBottom: "40px" }}>{Title}</h2>
        <img
          src={Image_url}
          alt="Couldn't find the image...."
          style={{ marginBottom: "50px" }}
        />
        {loading ? (
          <h3 className="text-center my-3"><Spinner/></h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sold by</th>
                <th>Rating</th>
                <th>Item price</th>
                <th colSpan="2">Total price</th>
              </tr>
            </thead>
            <tbody>
              {similar_products.map((product) => (
                <tr key={product.id}>
                  <td>{`${product.website_name}`}</td>
                  <td>
                  {

                  Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>{ index < product.rating ? "★" : "☆" }</span>
                  ))
                }
                  </td>
                  <td>{`₹${product.price}`}</td>
                  <td>{`₹${product.price}`}</td>
                  <td>
                    <Link to={product.website_url} target="_blank">Visit Site</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Product_Comparison_Page;
