import React, { useContext, useEffect, useState } from 'react';
import productContext from '../../context/products/Productcontext';
import Inputcontext from '../../context/searchBar/Inputcontext';
import Display_product from './Display_Product';
import loadingcontext from '../../context/Spinner/Loadingcontext';
import Spinner from './Spinner';
import Clickcontext from '../../context/click/Clickcontext';
import Modecontext from '../../context/mode/Modecontext';

export default function Price_filter(props) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { mode, toggleMode } = useContext(Modecontext);
    const loading_context = useContext(loadingcontext);
    const { loading, setLoading } = loading_context;
    const click_context = useContext(Clickcontext);
    const { Click, setClick } = click_context;
    let product_context = useContext(productContext);
    const { Input, setInput } = useContext(Inputcontext);
    const { products } = product_context;

    const [MinPrice, SetMinPrice] = useState(0);
    const [MaxPrice, SetMaxPrice] = useState(100000);

    const handlePriceRange = async (event) => {
        const { value } = event.target;
        SetMaxPrice(parseInt(value));
    };

    useEffect(() => {
        const filteredProducts = products.filter((item) => item.price >= MinPrice && item.price <= MaxPrice);
        setFilteredProducts(filteredProducts);
    }, [products, MinPrice, MaxPrice]);

    return (
        <div className="container py-5 " style={{ maxWidth: '569px', color: mode === 'dark' ? '#198754' : 'black' }}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="w-75 shadow p-3 mx-auto" style={{ backgroundColor: mode === 'dark' ? 'white' : 'white' }}>
                        <h3 className="fw-bold">All Product List</h3>
                        <label htmlFor="customRange1" className="form-label">
                            Filter by Price : ₹{MinPrice} - ₹{MaxPrice}
                        </label>
                        <input type="range" className="form-range" id="customRange1" min="0" max="100000" value={MaxPrice} onChange={handlePriceRange} />
                    </div>
                    <div className="row">
                        {filteredProducts.length === 0 && Click ? (
                            <h3 className="text-center my-3">
                                <b>No Products to Display</b>
                            </h3>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <div key={index} style={{ marginTop: '100px' }}>
                                    <Display_product product={product} alert={props.alert} showAlert={props.showAlert} cart_action={'Add to Cart'} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
