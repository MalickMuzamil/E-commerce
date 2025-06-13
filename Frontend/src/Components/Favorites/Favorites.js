import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorite, removeFavorite } from '../../Redux/Favourite/FavouriteItem.js';
import Navbar from '../../Components/Navbar/Navbars.js'
import Footer from '../../UI/Footer/Footer.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite_category.favorites);
    const [visibleItems, setVisibleItems] = useState(4);

    useEffect(() => {
        dispatch(fetchFavorite());

        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    navigate("/")
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

                else{
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);

                if (err.response?.status === 401){
                    navigate("/")
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }
        };

        refreshToken();

    }, [dispatch, navigate]);

    const handleFavItemDelete = (favItem) => {
        toast.warning(
            <div>
                <p>Are you sure you want to delete this item?</p>
                <button
                    onClick={async () => {
                        toast.dismiss();

                        await dispatch(removeFavorite(favItem._id));

                        toast.success("Item Successfully Removed", {
                            autoClose: 3000,
                        });

                        dispatch(fetchFavorite());
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
        if (visibleItems >= favorites.length) {
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
                        {favorites.length > 0 ? (
                            <div className="row g-4 py-5">
                                {favorites.slice(0, visibleItems).map(favItem => (
                                    <div key={favItem._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                        <div className="card-Data-Fetch px-3">
                                            <div className="text-center">
                                                <img
                                                    src={`http://localhost:3001/upload/${favItem.image}`}
                                                    alt="error"
                                                    className='image'
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Brand:</span>
                                                {favItem.brand}
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Category:</span>
                                                {favItem.category}
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Price:</span>
                                                {favItem.price}$
                                            </div>
                                            <div className="d-flex justify-content-between fs-6 my-2">
                                                <span className="fw-bold">Product Stock:</span>
                                                {favItem.stock}
                                            </div>
                                            <button className="Cart-Button" onClick={() => handleFavItemDelete(favItem)}>Delete From Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card-Data-Fetch">
                                <p>No products available in the Cart</p>
                            </div>
                        )}

                        {favorites.length > 4 && (
                            <button className="button-dropdown my-5 mx-5" onClick={handleShowMore}>
                                {visibleItems >= favorites.length ? 'Show Less' : 'Show More'}
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
