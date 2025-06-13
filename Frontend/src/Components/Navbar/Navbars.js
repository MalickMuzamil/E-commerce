import React, { useEffect, useState } from 'react'
import './Navbars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { fetchFavorite } from '../../Redux/Favourite/FavouriteItem.js';
import { fetchCart } from '../../Redux/Cart/Cart.js';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../../Redux/SearchBar Reducer/SearchBar.js'

export default function Navbars() {

    const [username, setUsername] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite_category.favorites);
    const CartDetails = useSelector(state => state.Cart_category.cart);
    const ResultQuery = useSelector((state) => state.search_query.query);

    const [hasSearched, setHasSearched] = useState(false);

    const [CartItemsDropDown, setCartItemsDropDownItems] = useState(3);
    const [showMore, setShowMore] = useState(false);
    const [showMoreItems, setShowMoreItems] = useState(false);
    const [favoriteItemDropDown, setFavoriteItemDropDown] = useState(3);

    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(fetchFavorite());
        dispatch(fetchCart());
    }, [dispatch]);

    const toggleFavoritesDropdown = () => {
        setShowFavorites(!showFavorites);
    };

    const toggleCartDropdown = () => {
        setShowCart(!showCart);
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
        setCartItemsDropDownItems(showMore ? 3 : CartDetails.length);
    };

    const handleShowMoreFavoriteItems = () => {
        setShowMoreItems(!showMoreItems);
        setFavoriteItemDropDown(showMoreItems ? 3 : favorites.length);
    };


    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
            dispatch(SearchBar(query.trim()));

        }
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'Guest');
    }, []);



    return (
        <>
            <div className="marquee-container bg-dark d-flex justify-content-center text-center text-white py-3">
            <div className="marquee">
                Join our showroom and get 25% off! Coupon code: Bangbang45
            </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
                <div className="container-fluid mx-5">
                    <form onSubmit={handleSearch} className="d-flex align-items-center">
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <button type="submit" className='bg-white border-0'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                            />
                        </div>
                    </form>

                    {hasSearched && (
                        ResultQuery.length > 0 ? (
                            <ul id="searchDropdown" className="dropdown-menu navbar-drop-search show">
                                <li className="dropdown-header">Searched Product</li>
                                {ResultQuery.map((result) => (
                                    <li key={result._id} className="dropdown-item">
                                        <div className="dropdown-item-content">
                                            <div>
                                                <span className="label">Category:</span> {result.category}
                                            </div>
                                            <div>
                                                <span className="label">Brand:</span> {result.brand}
                                            </div>
                                            <div>
                                                <span className="label">OutFit:</span> {result.type}
                                            </div>
                                            <div>
                                                <span className="label">Season:</span> {result.season}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Results found</p>
                        )
                    )}


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse align-items-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 mx-auto pe-4 align-items-center">
                            <li className="nav-item dropdown">
                                <Link to="/home" className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton1"
                                >
                                    Home

                                </Link>

                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link fw-bold text-decoration-none text-dark"
                                    role="button">About</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Shop
                                </button>
                                <ul className="dropdown-menu navbar-drop-Shop py-4 px-4" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <div className='row text-center custom-dropdown'>
                                            <div className='col-4'>
                                                <p className="fs-5 fw-bold text-primary">Mens</p>
                                                <hr />
                                                <ul className='custom-list list-unstyled'>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark" to="/mencategory/Formal">Formal</Link>
                                                    </li>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark" to="/mencategory/Casual">Casual</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='col-4'>
                                                <p className="fs-5 fw-bold text-primary">Womens</p>
                                                <hr />
                                                <ul className='list-unstyled'>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark" to="/womencategory/Formal">Formal</Link>
                                                    </li>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark" to="/womencategory/Casual">Casual</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className='col-4'>
                                                <p className="fs-5 fw-bold text-primary">Kids</p>
                                                <hr />
                                                <ul className='custom-list list-unstyled'>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark gap-3" to="/kidscategory/Formal">Formal</Link>
                                                    </li>
                                                    <li>
                                                        <Link className="text-decoration-none text-dark" to="/kidscategory/Casual">Causal</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item h3 fw-bold">
                                <Link to="/home" className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton1"
                                >
                                    AZEDW

                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton4"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Pages
                                </button>
                                <ul className="dropdown-menu navbar-drop-chat" aria-labelledby="dropdownMenuButton4">
                                    <li><Link className="dropdown-item" to="/FavoritesDetails">View</Link></li>
                                    <li><Link className="dropdown-item" to="/cartDetails">Cart</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item fw-bold">
                                <Link to="/blog" className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton1"
                                >
                                    Blog

                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/contact" className="nav-link fw-bold text-decoration-none text-dark"
                                    id="dropdownMenuButton1"
                                >
                                    Contact

                                </Link>

                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <div className="nav-item dropdown me-3">
                                <div className="nav-link" onClick={toggleCartDropdown} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faBagShopping} className="fa-light mx-3 fs-4" />
                                    {CartDetails.length > 0 && (
                                        <span className='badge bg-danger ms-2'>{CartDetails.length}</span>
                                    )}
                                </div>
                                {showCart && (
                                    <ul className="dropdown-menu navbar-drop-chat show">
                                        <li className="dropdown-header">Cart</li>
                                        {CartDetails.slice(0, CartItemsDropDown).map(cartItem => (
                                            <li key={cartItem._id} className="dropdown-item">
                                                <Link to={`/product/${cartItem._id}`} className="dropdown-item-link">
                                                    <div className="dropdown-item-content">
                                                        <div>
                                                            <span className="label">Brand:</span> {cartItem.brand}
                                                        </div>
                                                        <div>
                                                            <span className="label">Price:</span> {cartItem.price}$
                                                        </div>
                                                        <div>
                                                            <span className="label">Category:</span> {cartItem.category}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                        {CartDetails.length > 3 && (
                                            <div className="my-3 text-center">
                                                <button className="button-dropdown" onClick={handleShowMore}>
                                                    {showMore ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>
                                        )}
                                    </ul>
                                )}
                            </div>

                        </div>

                        <div className="d-flex align-items-center">
                            <div className="nav-item dropdown me-3">
                                <div className="nav-link" onClick={toggleFavoritesDropdown} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faHeart} className="fa-light mb-0 fs-4" />
                                    {favorites.length > 0 && (
                                        <span className='badge bg-danger ms-2'>{favorites.length}</span>
                                    )}
                                </div>
                                {showFavorites && (
                                    <ul className="dropdown-menu navbar-drop-chat show">
                                        <li className="dropdown-header">Favorites</li>
                                        {favorites.slice(0, favoriteItemDropDown).map(fav => (
                                            <li key={fav._id} className="dropdown-item">
                                                <Link to={`/product/${fav._id}`} className="dropdown-item-link">
                                                    <div className="dropdown-item-content">
                                                        <div>
                                                            <span className="label">Brand:</span> {fav.brand}
                                                        </div>
                                                        <div>
                                                            <span className="label">Price:</span> {fav.price}$
                                                        </div>
                                                        <div>
                                                            <span className="label">Category:</span> {fav.category}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                        {favorites.length > 3 && (
                                            <div className="my-3 text-center">
                                                <button className="button-dropdown" onClick={handleShowMoreFavoriteItems}>
                                                    {showMoreItems ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>

                                        )}
                                    </ul>
                                )}
                            </div>

                        </div>


                        <div className="d-flex align-items-center">
                            <div className="nav-item dropdown me-3">
                                <ul className="mb-0 px-0 ms-2">
                                    <li className="nav-item dropdown list-unstyled d-flex">
                                        <FontAwesomeIcon icon={faUser} className="fa-light fs-4 mb-0" />
                                        <button
                                            href="/"
                                            className="nav-link fw-bold text-decoration-none text-dark ms-2"
                                            id="dropdownMenuButton4"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {username ? username : 'Guest'}
                                        </button>
                                        <ul className="dropdown-menu navbar-drop-chat-logout"
                                            aria-labelledby="dropdownMenuButton4">
                                            <li><Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                                        </ul>
                                    </li>

                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

            </nav >

        </>
    )
}
