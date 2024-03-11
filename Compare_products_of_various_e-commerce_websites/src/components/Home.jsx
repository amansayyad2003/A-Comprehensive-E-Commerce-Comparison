import React, { useContext } from 'react'
import productContext from '../../context/products/Productcontext'
import Display_Product from './Display_Product'
export default function Home() {
    const context = useContext(productContext)
    const {products} = context // destructuring
  return (
    <div className='container'>

<h1 style={{ textAlign: 'center' }}>Displaying Products</h1>
    <div className="row">
    {products.length!==0 && products.map((product)=>{
        return  <div className="col-md-4 my-2">
        <Display_Product title={product.title} description={product.description}/>
        </div>
    })}
</div>
       
      
    </div>
  )
}
