import React from 'react';
// import './styles.css'
export default function Product_Comparison_Page() {
  return (
    <div>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <div class="product-section">
            <h2 class="product-title">Product Title</h2>
            <p class="product-description">Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut dui at libero viverra efficitur et vitae ex. Nulla venenatis faucibus libero, vel venenatis velit laoreet ut.</p>
            <img class="product-image" src="product-image.jpg" alt="Product Image" />
          </div>

          <div class="container">
            <div class="box-1" style={{ marginBottom: '20px' }}>
              <h3>Website1</h3>
              <p class="price">$10</p>
              <p class="rating">Rating: 4.5/5</p>
            </div>
            <div class="box-2" style={{ marginBottom: '20px' }}>
              <h3>Website2</h3>
              <p class="price">$12</p>
              <p class="rating">Rating: 4.2/5</p>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
}
