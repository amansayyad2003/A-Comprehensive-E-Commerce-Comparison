import React from 'react'
import PropTypes from 'prop-types'
import { Link
} from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" to="/">Compare Craft</a>
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
    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
    <Link className="btn btn-primary mx-2" to="/TODO" role="button">View Cart</Link>
  </div>
</nav>
    </div>
  )
}

Navbar.propTypes = {

}

export default Navbar

