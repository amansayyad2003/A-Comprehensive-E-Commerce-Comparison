import React from 'react'
import Price_filter from './Price_filter'
export default function Home(props) {


  return (
    <div className='container'>

    <Price_filter alert={props.alert} showAlert={props.showAlert}/>

    </div>
  )
}
