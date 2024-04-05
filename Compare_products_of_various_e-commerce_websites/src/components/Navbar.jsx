import React from 'react'
import PropTypes from 'prop-types'
import { Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {

  const navigate = useNavigate();

  const handleLogout = ()=>{

    localStorage.removeItem('authtoken')

    navigate("/login");

    
  }



  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Compare Craft</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>   
      </ul>
      
    </div>

    {!localStorage.getItem('authtoken')?      <form className="d-flex">
      <Link to="/login" className="btn btn-primary mx-2" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
      <Link to="/signup" className="btn btn-primary mx-2" tabIndex="-1" role="button" aria-disabled="true">Sign Up</Link></form>
  :<button type="button" className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>}

    <Link to="/displaycart"><i className="fa-solid fa-cart-shopping"></i></Link>
    {/* <Link className="btn btn-primary mx-2" to="/TODO" role="button">View Cart</Link> */}
  </div>
</nav>
    </div>
  )
}

Navbar.propTypes = {

}

export default Navbar

