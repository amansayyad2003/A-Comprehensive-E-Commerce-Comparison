import React, { useContext} from 'react'
import { Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modecontext from '../../context/mode/Modecontext';
function Navbar() {


  const {mode,toggleMode}= useContext(Modecontext)



  const navigate = useNavigate();

  const handleLogout = ()=>{

    localStorage.removeItem('authtoken')

    navigate("/login");
    
  }

  return (
    <div>
      <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Compare Craft</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" style={{ fontSize: '20px' }}> Home</Link>
        </li>   
      </ul>
      
    </div>



    <div class={`form-check form-switch mx-2 text-${mode == 'dark'?"light":"dark"}`} style={{ marginTop: '10px' }} >
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleMode}/>
  <label class="form-check-label mx-2" htmlFor="flexSwitchCheckDefault"><h5>Enable Dark Mode</h5></label>
</div>

    {!localStorage.getItem('authtoken')?      <htmlForm className="d-flex">
      <Link to="/login" className="btn btn-primary mx-2" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
      <Link to="/signup" className="btn btn-primary mx-2" tabIndex="-1" role="button" aria-disabled="true">Sign Up</Link></htmlForm>
  :<button type="button" className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>}

    <Link to="/displaycart"><i className="fa-solid fa-cart-shopping mx-2 "></i></Link>
    <h5 style={{ marginTop: '10px' }} className={`text-${mode == 'dark'?"light":"dark"}`} >Cart</h5>
  </div>
</nav>
    </div>
  )
}

Navbar.propTypes = {

}

export default Navbar

