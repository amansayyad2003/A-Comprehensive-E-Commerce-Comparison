import React, { useContext, useState } from "react";
import "./styles.css"; // Assuming your CSS file is in the same directory
import { Link } from "react-router-dom";
import Imagecontext from "../../context/product_image/Imagecontext";
import Display_product from "./Display_Product";
import productContext from "../../context/products/Productcontext";
import Product from "./Product";
import similarproductContext from "../../context/SimilarProductContext/Similarproductcontext";

function Product_Comparison_Page(props) {
  const context1 = useContext(similarproductContext);
  // const [similar_products, setSimilarProducts] = useState([]);
  const { similar_products, setSimilarProducts } = context1;
  // const [loading, setLoading] = useState(false);

  const image_url_context = useContext(Imagecontext);
  const { Image_url, setImage_url, Title } = image_url_context;
  const [websiteName, setWebsiteName] = useState("Flipkart");

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "40px" }}>{Title}</h2>
        <img
          src={Image_url}
          alt="Couldn't find the image...."
          style={{ marginBottom: "50px" }}
        />
        <table>
          <thead>
            <tr>
              <th>Sold by</th>
              <th>Details &amp; special offers</th>
              <th>Item price</th>
              <th colSpan="2">Total price</th>
            </tr>
          </thead>
          <tbody>
            {similar_products.length === 0 ? (
              <h3 className="text-center my-3">Loading ...</h3>
            ) : (
              similar_products.map((product) => {
                return (
                  <tr>
                    <td>Flipkart</td>
                    <td>Free delivery by Sat, 13 Apr</td>
                    <td>₹323</td>
                    <td>₹4342</td>
                    <td>
                      <Link to="http://www.google.com">Visit Site</Link>
                    </td>
                  </tr>
                  // <div className="my-2">
                  //   {console.log(product)}
                  //   <Display_Product
                  //     product={product}
                  //     alert={props.alert}
                  //     showAlert={props.showAlert}
                  //     cart_action={"Add to Cart"}
                  //   />
                  // </div>
                );
                // setWebsiteName("Croma");
              })
            )}
            {/* <tr>
              <td>Flipkart</td>
              <td>Free delivery by Sat, 13 Apr</td>
              <td>₹13,480.00</td>
              <td>₹13,480.00</td>
              <td>
                <Link to="http://example.com/product-a">Visit Site</Link>
              </td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td>Free delivery by Sat, 13 Apr</td>
              <td>₹13,480.00</td>
              <td>₹13,480.00</td>
              <td>
                <Link to="http://example.com/product-a">Visit Site</Link>
              </td>
            </tr>
            <tr>
              <td>Chroma</td>
              <td>Free delivery by Sat, 13 Apr</td>
              <td>₹13,480.00</td>
              <td>₹13,480.00</td>
              <td>
                <Link to="http://example.com/product-a">Visit Site</Link>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* <h1 style={{ marginTop: '40px', marginLeft: "30px"}}> Similar Products</h1>
    <div className='container'>


      <Product alert={props.alert} showAlert={props.showAlert}/>


   
  
    </div> */}
      {/* <Display_product product={product} alert={props.alert} showAlert={props.showAlert} cart_action={"Add to Cart"}/> */}
    </>
  );
}

export default Product_Comparison_Page;
