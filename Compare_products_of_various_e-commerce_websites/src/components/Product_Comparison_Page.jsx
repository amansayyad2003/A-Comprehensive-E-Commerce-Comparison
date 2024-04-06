import React, { useContext } from "react";
import "./styles.css"; // Assuming your CSS file is in the same directory
import { Link } from "react-router-dom";
import Imagecontext from "../../context/product_image/Imagecontext";
import Display_product from "./Display_Product";
import productContext from "../../context/products/Productcontext";
import Product from "./Product";
import similarproductContext from "../../context/SimilarProductContext/Similarproductcontext";
import loadingcontext from "../../context/Spinner/Loadingcontext";
import Spinner from "./Spinner";

function Product_Comparison_Page(props) {
  const loading_context = useContext(loadingcontext);
  const { loading } = loading_context;
  const context1 = useContext(similarproductContext);
  const { similar_products } = context1;

  const image_url_context = useContext(Imagecontext);
  const { Image_url, Title } = image_url_context;

  return (
    <>
      <div style={{ textAlign: "center" }}>
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
                <th>Details &amp; special offers</th>
                <th>Item price</th>
                <th colSpan="2">Total price</th>
              </tr>
            </thead>
            <tbody>
              {similar_products.map((product) => (
                <tr key={product.id}>
                  <td>{`${product.website_name}`}</td>
                  <td>{"Free delivery by Sat, 13 Apr"}</td>
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
