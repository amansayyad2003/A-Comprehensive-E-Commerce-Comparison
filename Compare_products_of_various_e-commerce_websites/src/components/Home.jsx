import React, { useContext, useEffect, useState } from 'react'
import Sort_products from './Sort_products'
import Product from './Product'
import productContext from '../../context/products/Productcontext'
import Display_Cart from './Display_Cart'
export default function Home(props) {
  



  return (
    <div className='container'>

    <Sort_products/>    

    <Product alert={props.alert} showAlert={props.showAlert}/>


       
      
    </div>
  )
}
