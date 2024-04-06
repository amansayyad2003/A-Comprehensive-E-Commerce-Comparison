import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import Inputcontext from '../../context/searchBar/Inputcontext'
import Display_product from './Display_Product'
import loadingcontext from '../../context/Spinner/Loadingcontext'
import Spinner from './Spinner'
import Clickcontext from '../../context/click/Clickcontext';
export default function Price_filter(props) {

  const [filteredProducts, setFilteredProducts] = useState([]);

  const loading_context = useContext(loadingcontext)
    const {loading,setLoading} = loading_context

    const click_context = useContext(Clickcontext)
    const {Click,setClick} = click_context


    let product_context = useContext(productContext)

    const { Input, setInput } = useContext(Inputcontext);

    const {products} = product_context

    {console.log("PRINTING PRODUCTS RECEIVED BY PRICE_FILTER.JSX FROM SEARCH BAR.JX")}

    {console.log(products)}


    const [MinPrice,SetMinPrice] = useState(0)

    const [MaxPrice,SetMaxPrice] = useState(100000)

    const handlePriceRange = async(event) => {

        const {value} = event.target

        // SetMaxPrice(value)
        SetMaxPrice(parseInt(value)); 

        console.log("ABOUT TO PRINT Products INSIDE Price_filter.jsx")

        console.log(products)

        
      }

      console.log("ABOUT TO PRINT Products BEFORE FORMING FILTERED PRODUCTS!!!")

      console.log(products)

      // const filteredProducts = products.filter((item) => item.price >= MinPrice && item.price <= MaxPrice);

      // console.log(MinPrice)
      // console.log(MaxPrice)

      // console.log("ABOUT TO PRINT filteredProducts INSIDE Price_filter.jsx")

      // console.log(filteredProducts)

       
      useEffect(() => {
        const filteredProducts = products.filter((item) => item.price >= MinPrice && item.price <= MaxPrice);
        setFilteredProducts(filteredProducts);
    }, [products, MinPrice, MaxPrice]);
    




   
  return (
    // style={{marginTop:"100px"}}
    <div className='container py-5 ' style={{ maxWidth: '569px' }}>

        <div className="w-75 shadow p-3 mx-auto" >

            <h3 className='fw-bold'>All Product List</h3>

            <label for="customRange1" class="form-label">Filter by Price :  ₹{MinPrice} - ₹{MaxPrice}</label>
            <input type="range" class="form-range" id="customRange1" min="0" max="100000" value={MaxPrice} onChange={handlePriceRange}/>
        </div>

        <div className="row" >
         {loading?<Spinner/>: filteredProducts.length === 0 && Click ? <h3 className="text-center my-3"><b>No Products to Display</b></h3> : filteredProducts.map((product) => {
            return (
                <div style={{marginTop:"100px"}}>
                    {console.log("About to print product before passing to Display Product")}
                    {console.log(product)}
                    <Display_product product={product} alert={props.alert} showAlert={props.showAlert} cart_action={"Add to Cart"}/>
                </div>
            );
        })}
    </div>
      
      

    </div>
  )
}
