import React, { useContext } from 'react';
import './styles.css'; // Assuming your CSS file is in the same directory
import { Link } from "react-router-dom";
import Imagecontext from '../../context/product_image/Imagecontext';

function Product_Comparison_Page() {
  const image_url_context = useContext(Imagecontext);
  const { Image_url, setImage_url, Title } = image_url_context;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '40px' }}>{Title}</h2>
      <img src={Image_url} alt="Couldn't find the image...." style={{ marginBottom: '50px' }} />
      <table >
        <thead>
          <tr>
            <th>Sold by</th>
            <th>Details &amp; special offers</th>
            <th>Item price</th>
            <th colSpan="2">Total price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flipkart</td>
            <td>Free delivery by Sat, 13 Apr</td>
            <td>₹13,480.00</td>
            <td>₹13,480.00</td>
            <td><Link to="http://example.com/product-a">Visit Site</Link></td>
          </tr>
          <tr>
            <td>Amazon</td>
            <td>Free delivery by Sat, 13 Apr</td>
            <td>₹13,480.00</td>
            <td>₹13,480.00</td>
            <td><Link to="http://example.com/product-a">Visit Site</Link></td>
          </tr>
          <tr>
            <td>Chroma</td>
            <td>Free delivery by Sat, 13 Apr</td>
            <td>₹13,480.00</td>
            <td>₹13,480.00</td>
            <td><Link to="http://example.com/product-a">Visit Site</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Product_Comparison_Page;
