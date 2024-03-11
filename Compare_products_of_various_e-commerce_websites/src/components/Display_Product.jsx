import React, { useContext } from 'react'

export default function Display_Product(props) {




  return (
    <div>
      <div className="card">
  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <a href="/TODO" className="btn btn-primary">Go to the Website of this product</a>
  </div>
</div>
    </div>
  )
}
