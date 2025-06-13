import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart, removeCart } from '../../Redux/Cart/Cart.js';
import Navbar from '../../Components/Navbar/Navbars.js';
import Footer from '../../UI/Footer/Footer.js';
import './Cart.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CartDetails = useSelector(state => state.Cart_category.cart);
    const loading = useSelector((state) => state.mens_category.loading);
    const error = useSelector((state) => state.mens_category.error);
    const [visibleItems, setVisibleItems] = useState(4);

    useEffect(() => {
        dispatch(fetchCart());

        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
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

                else {
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);

                if (err.response?.status === 401) {
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }
        };

        refreshToken();

    }, [dispatch, navigate]);


    const handleCartDelete = (CartItem) => {
        toast.warning(
            <div>
                <p>Are you sure you want to delete this item?</p>
                <button
                    onClick={async () => {
                        toast.dismiss();

                        await dispatch(removeCart(CartItem._id));

                        toast.success("Item Successfully Removed", {
                            autoClose: 3000,
                        });

                        dispatch(fetchCart());
                    }}
                    style={{ marginRight: '10px' }}
                >
                    Confirm
                </button>

                <button onClick={() => toast.dismiss()}>Cancel</button>
            </div>, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            style: {
                fontSize: '18px',
                padding: '20px',
                textAlign: 'center',
            },
            className: 'custom-toast'
        });
    };

    const handleShowMore = () => {
        if (visibleItems >= CartDetails.length) {
            setVisibleItems(4);
        }

        else {
            setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
        }
    };


    return (
        <>

            <Navbar />

            <div className="container-fluid" style={{ backgroundColor: "#F1F6FA" }}>
                <div className="row">
                    <div className="col">
                        {loading === 'pending' && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {CartDetails.length > 0 ? (
                            <div className="row g-4 py-5">
                                {CartDetails.slice(0, visibleItems).map(CartItem => (
                                    <div key={CartItem._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                        <div className="card-Data-Fetch px-3">
                                            <div className="text-center">
                                                <img
                                                    src={`http://localhost:3001/upload/${CartItem.image}`}
                                                    alt="img"
                                                    className='image'
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Brand:</span>
                                                {CartItem.brand}
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Category:</span>
                                                {CartItem.category}
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Type:</span>
                                                {CartItem.type}
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Price:</span>
                                                {CartItem.price}$
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Stock:</span>
                                                {CartItem.stock}
                                            </div>
                                            <button className="Cart-Button" onClick={() => handleCartDelete(CartItem)}>Delete From Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card-Data-Fetch text-center">
                                <p>No products available in the Cart</p>
                            </div>
                        )}

                        {CartDetails.length > 4 && (
                            <button className="button-dropdown my-5 mx-5" onClick={handleShowMore}>
                                {visibleItems >= CartDetails.length ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
            <Footer />

        </>
    )
}
