import React, { useEffect, useState } from 'react';
import { fetchMensCategories } from '../Redux/Reducers/MensCategory.js';
import { fetchWomensCategories } from '../Redux/Reducers/WomensReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart } from '../Redux/Cart/Cart';
import { useParams } from 'react-router-dom';
import Footer from '../UI/Footer/Footer.js';
import Navbars from '../Components/Navbar/Navbars.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FilteredCategoryData() {

    const dispatch = useDispatch();
    const { category } = useParams();
    const [visibleItems, setVisibleItems] = useState(4);
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const [quantity, setQuantity] = useState(1);


    const categories = useSelector((state) => {
        switch (category) {
            case "Men":
                return state.mens_category.menscategories;
            case "Women":
                return state.womens_category.womenscategories;
            case "T-Shirts":
                return [...state.mens_category.menscategories, ...state.womens_category.womenscategories].filter(product => product.type === "T-Shirt");
            case "Pants":
                return [...state.mens_category.menscategories, ...state.womens_category.womenscategories].filter(product => product.type === "Pants");
            case "Tops":
                return [...state.mens_category.menscategories, ...state.womens_category.womenscategories].filter(product => product.type === "Tops");
            case "Jackets":
                return [...state.mens_category.menscategories, ...state.womens_category.womenscategories].filter(product => product.type === "Jackets");
            default:
                return [];
        }
    });

    useEffect(() => {
        switch (category) {
            case "Men":
                dispatch(fetchMensCategories());
                break;
            case "Women":
                dispatch(fetchWomensCategories());
                break;
            default:
                console.log("Chal rha ?");
        }
    }, [dispatch, category]);

    const handleShowMore = () => {
        if (visibleItems >= categories.length) {
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
            <Navbars />

            <div className="container-fluid" style={{ backgroundColor: "#F1F6FA" }}>
                <div className="row">
                    <div className="col">
                        {categories.length > 0 ? (
                            <div className="row g-4 py-5">
                                {categories.slice(0, visibleItems).map(product => (
                                    <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                        <div className="card-Data-Fetch px-3">
                                            <div className="text-center mb-4">
                                                <img
                                                    src={`http://localhost:3001/upload/${product.image}`}
                                                    alt="error"
                                                    className='image'
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between fs-6 my-">
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
                            <div className="card-Data-Fetch my-5 mx-3">
                                <p>No products available in the selected category</p>
                            </div>
                        )}
                        {categories.length > 4 && (
                            <button className="button-dropdown my-5 mx-5" onClick={handleShowMore}>
                                {visibleItems >= categories.length ? 'Show Less' : 'Show More'}
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
