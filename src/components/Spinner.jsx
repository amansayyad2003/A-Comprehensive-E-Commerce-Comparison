import React from 'react'
import loading from './loading.gif'
export default function Spinner() {
  return (
    <div className='text-center'>

<img src={loading} alt="loading" style={{ marginLeft: '-70px',marginTop:'20px' }} />
      
    </div>
  )
}
