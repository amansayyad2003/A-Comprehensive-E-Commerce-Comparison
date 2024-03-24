import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/products/Productcontext'
import Display_Product from './Display_Product'
// import Spinner from './Spinner';
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
export default function Product(props) {
    const context = useContext(productContext)
    const [loading,setLoading] = useState(false)
    const {products,setProducts} = context // destructuring
    const [page,setPage]= useState(1)
    const [totalResults,setTotalResults]= useState(0)

    let API_URL = "http://localhost:3000/api/product"

    const pageSize = 21;
    
    const fetchMoreData = async(e)=>{

      // setLoading(true)

      
      let url = `${API_URL}?page=${page+1}&pageSize=${pageSize}`
      setPage(page+1)
    
      
        const response = await axios.get(url);



        setProducts(products.concat(response.data.mydata))

            //  setTimeout(()=>{

          // setLoading(false)
        // },2000)

        // setLoading(false)

    
      }

     
    

    const updateProducts = async() => {

      
        console.log("Inside update products")
  
        let url = `${API_URL}?page=${page}&pageSize=${pageSize}`

        // props.setProgress(30);

        const response = await axios.get(url);
        console.log("Printing response")
        console.log(response)

        setProducts(response.data.mydata)

        setTotalResults(response.data.totalResults)

        // setTimeout(()=>{

          // setLoading(false)
        // },3000)
        
        // setLoading(false)

        // console.log(loading)

    
      }

      useEffect(()=>{

        updateProducts();
      },[])



  return (
    <>
{/* {console.log(loading)} */}
{/* {loading && <Spinner/>} */}
{console.log(loading)}
<InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length<=totalResults}
          // loader={<Spinner/>}
          loader={<h3>Loading...</h3>}
        >

          <div className="container">
          
      

    <div className="row" style={{marginTop:'20px' }}>
      {loading?"":products.length===0?<h3 className="text-center my-3">No Products to Display</h3>: products.map((product)=>{
        return  <div className="col-md-4 my-2">
          {console.log(product)}
        <Display_Product product={product} alert={props.alert} showAlert={props.showAlert} cart_action={"Add to Cart"}/>
        </div>
    })}


    
</div>
</div>   
</InfiniteScroll>
    </>
  )
}
