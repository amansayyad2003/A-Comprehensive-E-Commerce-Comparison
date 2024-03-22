import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import Display_Product from './Display_Product'
import Spinner from './Spinner';
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
export default function Product() {
    const context = useContext(productContext)
    const [loading,setLoading] = useState(false)
    const {products,setProducts} = context // destructuring
    const [page,setPage]= useState(1)
    const [totalResults,setTotalResults]= useState(0)
    let API_URL = "http://localhost:4000/api/product"

    const pageSize = 10;
    
    const fetchMoreData = async(e)=>{

      

      
      let url = `${API_URL}?page=${page+1}&pageSize=${pageSize}`
      setPage(page+1)
    
      
        const response = await axios.get(url);



        setProducts(products.concat(response.data.mydata))



    
      }

      const nextClick = async() => {

        
        let url = `${API_URL}?page=${page+1}&pageSize=${pageSize}`
        setPage(page+1)

        const response = await axios.get(url);

 

        setProducts(response.data.mydata)



      }
    

    const updateProducts = async() => {

      

  
        let url = `${API_URL}?page=${page}&pageSize=${pageSize}`

        // props.setProgress(30);

        const response = await axios.get(url);

        setProducts(response.data.mydata)

        setTotalResults(response.data.totalResults)



    
      }

      useEffect(()=>{

        updateProducts();
      },[])



  return (
    <>

{console.log(products)}
<button type="button" class="btn btn-primary" onClick={nextClick}>Next Page</button>

<InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length<=totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
          
      

    <div className="row" style={{marginTop:'20px' }}>
      {loading?"":products.length===0?<h3 className="text-center my-3">No Products to Display</h3>: products.map((product)=>{
        return  <div className="col-md-4 my-2">
        <Display_Product title={product.title} description={product.description}/>
        </div>
    })}
    
</div>
</div>   
</InfiniteScroll>
    </>
  )
}
