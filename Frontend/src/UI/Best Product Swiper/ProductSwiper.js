import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../Redux/Favourite/FavouriteItem.js'
import { AddCart } from '../../Redux/Cart/Cart.js'
import ProductModal from '../../UI/Modal View Product/ModalViewProduct'

import { fetchCart } from '../../Redux/Cart/Cart.js';
import { fetchFavorite } from '../../Redux/Favourite/FavouriteItem.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProductSwiper({ title }) {


    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShow = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const dispatch = useDispatch();
    const FavoriteDetails = useSelector(state => state.favorite_category.favorites);


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleFavoriteToggle = async (cartItem) => {
        try {
            await dispatch(addFavorite(cartItem));
            toast.success(`${cartItem.brand} Added to Favorites`);
            dispatch(fetchFavorite());
        }
        catch (error) {
            toast.error('Failed to add item to Favorites');
        }
    };

    const handleCartToggle = async (cartItem) => {
        try {
            await dispatch(AddCart(cartItem));
            toast.success(`${cartItem.brand} Added to Cart`);
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
                    {FavoriteDetails.length > 0 ? (
                        FavoriteDetails.map((cartItem) => (
                            <SwiperSlide key={cartItem._id}>
                                <div className="bg-white image-text my-5">
                                    <div className="text-center">
                                        <img
                                            src={`http://localhost:3001/upload/${cartItem.image}`}
                                            alt="Error"
                                            className='image'
                                        />
                                    </div>
                                    <p className='text-center mt-3 text-dark text-decoration-none text-on-image fs-5 fw-bold '>{cartItem.category}</p>
                                    <p className=' fs-5 fw-bold text-center mb-5 text-dark text-decoration-none'>{cartItem.price}$</p>

                                    <FontAwesomeIcon icon={faHeart} className='hover-icon'
                                        onClick={() => handleFavoriteToggle(cartItem)} />

                                    <Link onClick={() => handleShow(cartItem)}>
                                        <FontAwesomeIcon icon={faEye} className="hover-icon2" />
                                    </Link>

                                    <Link onClick={() => handleCartToggle(cartItem)}>
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

            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
