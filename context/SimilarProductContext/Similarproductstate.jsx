import similarproductContext from "./Similarproductcontext";
import React, { useState } from "react";
import Product_Comparison_Page from "../../src/components/Product_Comparison_Page";
import Display_product from "../../src/components/Display_Product";

export default function Similarproductstate(props) {
  const [similar_products, setSimilarProducts] = useState([]);
  return (
    <div>
      {/* If you wrap productContext tag around any element then props.Children would appear there automatically */}
      <similarproductContext.Provider
        value={{ similar_products, setSimilarProducts }}
      >
        {/* <Product_Comparison_Page />
        <Display_product /> */}
        {props.children}
      </similarproductContext.Provider>
    </div>
  );
}
