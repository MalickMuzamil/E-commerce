import React, { useEffect, useState } from 'react'
import './CardData.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWomensCategories } from '../../Redux/Reducers/WomensReducer.js'
import { useParams } from 'react-router-dom';
import { AddCart } from '../../Redux/Cart/Cart.js';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WomenData() {

    const dispatch = useDispatch();
    const { category } = useParams();
    const WomensData = useSelector((state) => state.womens_category.womenscategories);
    const loading = useSelector((state) => state.womens_category.loading);
    const error = useSelector((state) => state.womens_category.error);
    const [visibleItems, setVisibleItems] = useState(4);
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const [quantity, setQuantity] = useState(1);



    useEffect(() => {
        dispatch(fetchWomensCategories());

        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    return;
                }

                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refreshToken`, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`
                    }
                });

                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);
            }
        };

        refreshToken();
    }, [dispatch]);

    const filteredCategories = WomensData.filter(product => product.category === category);

    const handleShowMore = () => {
        if (visibleItems >= filteredCategories.length) {
            setVisibleItems(4);
        }

        else {
            setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
        }
    };

    const handleCartToggle = (product, quantity) => {

        dispatch(AddCart({
            ...product,
            quantity
        }));
        toast.success(`${product.type} Added to cart!`);
    };


    return (
        <>
            {loading === 'pending' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {filteredCategories.length > 0 ? (
                <div className="row g-4 py-5">
                    {filteredCategories.slice(0, visibleItems).map(product => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                            <div className="card-Data-Fetch px-3">
                                <div className="text-center">
                                    <img
                                        src={`http://localhost:3001/upload/${product.image}`}
                                        alt={product.category}
                                        className='image'
                                    />
                                </div>
                                <div className="d-flex justify-content-between fs-6 my-2">
                                    <span className="fw-bold">Brand:</span>
                                    {product.brand}
                                </div>
                                <div className="d-flex justify-content-between fs-6 my-2">
                                    <span className="fw-bold">Product Category:</span>
                                    {product.category}
                                </div>
                                <div className="d-flex justify-content-between fs-6 my-2">
                                    <span className="fw-bold">Product Price:</span>
                                    {product.price}$
                                </div>
                                <div className="d-flex justify-content-between fs-6 my-2">
                                    <span className="fw-bold">Product Stock:</span>
                                    {product.stock}
                                </div>

                                <div className="quantity-control my-4">
                                    <button className="btn btn-primary " onClick={decreaseQuantity}>-</button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        readOnly
                                        className="quantity-input px-3"
                                    />
                                    <button className="btn btn-primary" onClick={increaseQuantity}>+</button>
                                </div>

                                <button className="Cart-Button" onClick={() => handleCartToggle(product, quantity)}>Add to Cart Button</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card-Data-Fetch my-5 mx-5">
                    <p>No products available in the selected category</p>
                </div>
            )}

            {filteredCategories.length > 4 && (
                <button className="button-dropdown my-5 mx-5" onClick={handleShowMore}>
                    {visibleItems >= filteredCategories.length ? 'Show Less' : 'Show More'}
                </button>
            )}
            <ToastContainer />
        </>
    )
}
