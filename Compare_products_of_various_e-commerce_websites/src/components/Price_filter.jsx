import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/products/Productcontext'

export default function Price_filter() {

    let product_context = useContext(productContext)

    const {products,setProducts} = product_context


    const [MinPrice,SetMinPrice] = useState(0)

    const [MaxPrice,SetMaxPrice] = useState(100000)

    const handlePriceRange = async(event) => {

        const {value} = event.target

        SetMaxPrice(value)

        const filteredProducts = products.filter((item) => item.price >= MinPrice && item.price <= value);
        setProducts(filteredProducts);

    }






   
  return (
    <div className='container py-5'>

        <div className="w-25 shadow p-3 mx-auto">

            <h3 className='fw-bold'>All Product List</h3>

            <label for="customRange1" class="form-label">Filter by Price :  ₹{MinPrice} - ₹{MaxPrice}</label>
            <input type="range" class="form-range" id="customRange1" min="0" max="100000" value={MaxPrice} onChange={handlePriceRange}/>
        </div>
      
      

    </div>
  )
}
