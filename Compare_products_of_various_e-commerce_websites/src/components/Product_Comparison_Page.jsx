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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div style={{ textAlign: "center",color:mode==='dark'?'white':'black'} }>
        <h2 style={{ marginBottom: "40px", marginTop:"70px" }}>{Title}</h2>
        <img
          src={Image_url}
          alt="Couldn't find the image...."
          style={{ marginBottom: "50px" }}
        />

        {loading ? (
          <h3 className="text-center my-3">
            <Spinner />
          </h3>
        ) : (
          <>
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
              {similar_products[0]["same_product"].map((product) => (
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
                    <Link to={product.website_url} target="_blank">
                      Visit Site
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div
        className="row"
        style={{ marginLeft: "40px", marginTop: "20px", width: "1500px" }}
      >
        <h1 style={{ margin: "70px" }}>
          {" "}
          Similar Products
        </h1>
        {similar_products.length === 0 ? (
          <h3 className="text-center my-3">No Products to Display</h3>
        ) : (
          similar_products[0].similar_product.map((product) => {
            return (
              <div className="my-2">
                {console.log(
                  "About to print product before passing to Display Product"
                )}
                {console.log(product)}
                {/* <Display_product
                  product={product}
                  // alert={props.alert}
                  // showAlert={props.showAlert}
                  cart_action={"Add to Cart"}
                /> */}
                <div
                  className="product-container"
                  style={{
                    margin: "40px",
                    display: "flex",
                    width: "1100px",
                  }}
                >
                  <div className="image-container">
                    <img src={product.imgage_url} alt={product.title} />
                  </div>
                  <div
                    className="info-container"
                    style={{ marginLeft: "20px" }}
                  >
                    <h5 className="card-title">{product.title}</h5>
                    <p style={{ fontSize: "1.2em" }}>₹{product.price}</p>
                    {/* <p className="card-text">{props.product.description}</p> */}
                    <p>
                      <Link
                        to="/product-comparison"
                        className="btn btn-primary"
                        onClick={() => {
                          setImage_url(product.website_url);
                          setTitle(product.title);
                          // fetchData(JSON.stringify(product));
                        }}
                      >
                        Visit Website
                      </Link>
                    </p>
                    <div>
                      {/* <div className="btn btn-primary" onClick={props.cart_action === "Add to Cart" ? () => { addtoCart() } : () => { deletefromCart(props.product._id) }}>{props.cart_action}</div> */}
                      {/* <div
                        className="btn btn-primary"
                        onClick={
                          props.cart_action === "Add to Cart"
                            ? () => {
                                addtoCart();
                                setImage_url(props.product.image_url);
                                setTitle(props.product.title);
                              }
                            : () => {
                                deletefromCart(props.product._id);
                              }
                        }
                      >
                        
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
        </>
        )}
      </div>

      

      {/* <Display_product product={product} alert={props.alert} showAlert={props.showAlert} cart_action={"Add to Cart"}/> */}
    </>
  );
}

export default Product_Comparison_Page;
