import React, { useEffect, useState } from 'react'
import './Swipper.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../Redux/Cart/Cart.js';
import { fetchFavorite } from '../../Redux/Favourite/FavouriteItem.js'
import { addFavorite } from '../../Redux/Favourite/FavouriteItem.js'
import { AddCart } from '../../Redux/Cart/Cart.js'
import ProductModal from '../../UI/Modal View Product/ModalViewProduct'
import "swiper/css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Swipper({ title }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShow = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const dispatch = useDispatch();
    const FetchCart = useSelector((state) => state.Cart_category.cart);


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleFavoriteToggle = async (category) => {
        try {
            await dispatch(addFavorite(category));
            toast.success(`${category.brand} Added to Favorites`);
            dispatch(fetchFavorite());
        }
        catch (error) {
            toast.error('Failed to add item to Favorites');
        }
    };

    const handleCartToggle = async (category) => {
        try {
            await dispatch(AddCart(category));
            toast.success(`${category.brand} Added to Cart`);
            dispatch(fetchCart());
        }

        catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <>
            <div>
                <h1 className='heading-tag-swiper px-5 py-3'>{title}</h1>
                <hr className='mx-5' />
                <Swiper
                    modules={[A11y, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {FetchCart.length > 0 ? (
                        FetchCart.map((category) => (
                            <SwiperSlide key={category._id}>
                                <div className="bg-white image-text">
                                    <div className="text-center">
                                        <img
                                            src={`http://localhost:3001/upload/${category.image}`}
                                            alt="Error"
                                            className='image'
                                        />
                                    </div>
                                    <p className='text-center mt-3 text-dark text-decoration-none text-on-image fs-5 fw-bold '>{category.type}</p>
                                    <p className=' fs-5 fw-bold text-center mb-5 text-dark text-decoration-none'>{category.price}Pkr</p>

                                    <FontAwesomeIcon icon={faHeart} className='hover-icon'
                                        onClick={() => handleFavoriteToggle(category)} />

                                    <Link onClick={() => handleShow(category)}>
                                        <FontAwesomeIcon icon={faEye} className="hover-icon2" />
                                    </Link>

                                    <Link onClick={() => handleCartToggle(category)}>
                                        <FontAwesomeIcon icon={faCartShopping} className="hover-icon3" />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </Swiper>
            </div>
            {selectedProduct && (
                <ProductModal show={showModal} handleClose={handleClose} product={selectedProduct} />
            )}

            <ToastContainer />
        </>
    )
}
