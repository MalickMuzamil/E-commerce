import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddCart, fetchCart } from '../../Redux/Cart/Cart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { fetchMensCategories } from '../../Redux/Reducers/MensCategory.js';
import { fetchWomensCategories } from '../../Redux/Reducers/WomensReducer.js';
import { fetchKidsCategories } from '../../Redux/Reducers/KidsReducer.js';

import Navbars from '../Navbar/Navbars.js'
import Footer from '../../UI/Footer/Footer.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ShopNow({ position }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { season } = useParams();

    const [visibleItems, setVisibleItems] = useState(8);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const [quantity, setQuantity] = useState(1);

    const ShopNowCategory = useSelector((state) => {
        switch (season) {
            case "ShopNow":
                return [
                    ...state.mens_category.menscategories,
                    ...state.womens_category.womenscategories,
                    ...state.kids_category.kidscategories,
                    ...state.categories.categories
                ];

            case "Summer":
                return [
                    ...state.mens_category.menscategories,
                    ...state.womens_category.womenscategories,
                    ...state.kids_category.kidscategories,
                    ...state.categories.categories].filter(product => product.season === "Summer");

            case "Winter":
                return [
                    ...state.mens_category.menscategories,
                    ...state.womens_category.womenscategories,
                    ...state.kids_category.kidscategories,
                    ...state.categories.categories].filter(product => product.season === "Winter");


            case "Spring":
                return [
                    ...state.mens_category.menscategories,
                    ...state.womens_category.womenscategories,
                    ...state.kids_category.kidscategories,
                    ...state.categories.categories].filter(product => product.season === "Spring");

            default:
                return [];
        }
    });

    useEffect(() => {

        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    navigate("/")
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
                    navigate("/")
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);

                if (err.response?.status === 401) {
                    navigate("/")
                }
            }
        };

        refreshToken();

        switch (season) {
            case "ShopNow":
            case "Summer":
            case "Winter":
            case "Spring":
                dispatch(fetchMensCategories());
                dispatch(fetchWomensCategories());
                dispatch(fetchKidsCategories());
                break;
            default:
                toast.error('Invalid Category.');
        }

    }, [dispatch, season, navigate]);


    const handleShowMore = () => {
        if (visibleItems >= ShopNowCategory.length) {
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
        dispatch(fetchCart());
    };


    return (
        <>

            <Navbars />

            <div className="container-fluid" style={{ backgroundColor: "#F1F6FA" }}>
                <div className="row">
                    <div className="col">
                        {ShopNowCategory.length > 0 ? (

                            <div className="row g-4 py-5">
                                {ShopNowCategory.slice(0, visibleItems).map(product => (
                                    <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                        <div className="card-Data-Fetch px-3">
                                            <div className="text-center">
                                                <img
                                                    src={`http://localhost:3001/upload/${product.image}`}
                                                    alt="img"
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
                                                <span className="fw-bold">Product Type:</span>
                                                {product.type}
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
                                                <button className="btn btn-primary" onClick={decreaseQuantity}>-</button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    readOnly
                                                    className="quantity-input px-3"
                                                />
                                                <button className="btn btn-primary" onClick={increaseQuantity}>+</button>
                                            </div>
                                            <button className="Cart-Button" onClick={() => handleCartToggle(product, quantity)}>Add to Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <div className="card-Data-Fetch">
                                <p>No products available in the selected category</p>
                            </div>
                        )}
                        {ShopNowCategory.length > 4 && (
                            <button className="button-dropdown my-5 mx-5" onClick={handleShowMore}>
                                {visibleItems >= ShopNowCategory.length ? 'Show Less' : 'Show More'}
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
