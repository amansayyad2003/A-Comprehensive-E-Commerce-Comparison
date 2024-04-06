import React, { useContext, useEffect } from 'react';
import CartContext from '../../context/cart/Cartcontext';
import Display_Product from './Display_Product';
import { useNavigate } from 'react-router-dom';

export default function Display_Cart(props) {
  const context = useContext(CartContext);
  const { fetch_cart, cart } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authtoken')) fetch_cart();
    else {
      props.showAlert('You have to Login to View Your Cart!', 'danger');
      navigate('/login');
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10"> {/* Set width for "Your Cart" heading */}
          <h1 className="text-center mb-5"><b>Your Cart</b></h1>
        </div>
      </div>

      {/* Add significant distance */}
      <div style={{ marginBottom: '50px' }}></div>

      <div className="row justify-content-center">
        {cart.length === 0 ? (
          <h3 className="text-center my-3"><b>Your Cart is Empty</b></h3>
        ) : (
          cart.map((product) => (
            <div className="col-md-12 my-2" key={product.id}> {/* Set full width for each product */}
              <Display_Product product={product} cart_action={'Delete from Cart'} showAlert={props.showAlert} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
