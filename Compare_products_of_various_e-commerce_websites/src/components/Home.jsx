import React, { useContext, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import Display_Product from './Display_Product'
import Spinner from './Spinner';
export default function Home() {
    const context = useContext(productContext)
    const [loading,setLoading] = useState(false)
    const {products} = context // destructuring
  return (
    <div className='container'>

<h1 style={{ textAlign: 'center' }}>Displaying Products</h1>


    <div className="row">
      {loading?<Spinner/>:products.length===0?<h3 className="text-center my-3">No Products to Display</h3>: products.map((product)=>{
        return  <div className="col-md-4 my-2">
        <Display_Product title={product.title} description={product.description}/>
        </div>
    })}
    
</div>
       
      
    </div>
  )
}
