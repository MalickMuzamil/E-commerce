import React, { useState, useEffect } from 'react'
import './MainContent.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchpostCategories, deleteCategory } from '../../../Redux/Reducers/CategoryReducer.js';
import { fetchMensCategories, deleteMenCategory } from '../../../Redux/Reducers/MensCategory.js'
import { fetchWomensCategories, deleteWomenCategory } from '../../../Redux/Reducers/WomensReducer.js';
import { fetchKidsCategories, deleteKidsCategory } from '../../../Redux/Reducers/KidsReducer.js';
import ModalAddCategoriesAdmin from '../../../UI/Modal Add Category/AddCategoryAdmin.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MainContent({ title, subtitle, position }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setCurrentItem(null);
    };

    const categories = useSelector((state) => {
        switch (position) {
            case "MensPage":
                return state.mens_category.menscategories;
            case "WomensPage":
                return state.womens_category.womenscategories;
            case "KidsPage":
                return state.kids_category.kidscategories;
            default:
                return state.categories.categories;
        }
    });

    useEffect(() => {
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

                else {
                    navigate("/")
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);

                if (err.response?.status === 401) {
                    navigate('/');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                }
            }
        };

        refreshToken();

        if (position === "MensPage") {
            dispatch(fetchMensCategories());
        }

        else if (position === "WomensPage") {
            dispatch(fetchWomensCategories())
        }

        else if (position === "KidsPage") {
            dispatch(fetchKidsCategories());
        }

        else {
            dispatch(fetchpostCategories());
        }



    }, [dispatch, position, navigate]);


    const handleEdit = (item) => {
        toast(
            <div style={{ textAlign: 'center' }}>
                <p>Are you sure you want to edit {item.category}?</p>
                <div>
                    <button
                        onClick={() => {
                            toast.dismiss();
                            setCurrentItem(item);
                            setModalOpen(true);
                        }}
                        style={{ marginRight: '10px', background: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                className: 'custom-toast',
                style: {
                    fontSize: '18px',
                    padding: '20px',
                },
            }
        );
    };


    const handleDelete = (item) => {
        toast(
            <div style={{ textAlign: 'center' }}>
                <p>Are you sure you want to delete {item.category}Category?</p>
                <div>
                    <button
                        onClick={async () => {
                            toast.dismiss();
                            if (position === "WomensPage") {
                                await dispatch(deleteWomenCategory(item._id));
                            } else if (position === "MensPage") {
                                await dispatch(deleteMenCategory(item._id));
                            } else if (position === "KidsPage") {
                                await dispatch(deleteKidsCategory(item._id));
                            } else {
                                await dispatch(deleteCategory(item._id));
                            }

                            // Show success message
                            toast.success("Item successfully deleted!", {
                                autoClose: 3000,
                            });
                        }}
                        style={{ marginRight: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                className: 'custom-toast',
                style: {
                    fontSize: '18px',
                    padding: '20px',
                },
            }
        );
    };


    return (
        <>
            <div className="container-fluid colum-padding">
                <div className="row" style={{ display: "contents" }}>
                    <div className="col-12">
                        <h2>{title}</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">{subtitle}</li>
                        </ul>
                    </div>

                    <div className="row mb-3 justify-content-end">
                        <div className="col-auto">
                            <button className='btn my-3 button-dashboard' onClick={openModal}>Add Category</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Brand</th>
                                            <th>Type</th>
                                            <th>Season</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((item, index) => (
                                            <tr key={index} className='text-center'>
                                                <td>{item.category}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.type}</td>
                                                <td>{item.season}</td>
                                                <td>{item.price}</td>
                                                <td>{item.stock}</td>
                                                <td className='text-center'>
                                                    {item.image && (
                                                        <img
                                                            src={`http://localhost:3001/upload/${item.image}`}
                                                            alt="Error"
                                                            style={{ width: '150px' }}
                                                        />
                                                    )}
                                                </td>

                                                <td className="d-flex justify-content-center">
                                                    <button className='btn button-dashboard mx-3'
                                                        onClick={() => handleEdit(item)}>Edit</button>
                                                    <button className='btn button-dashboard'
                                                        onClick={() => handleDelete(item)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

            <ModalAddCategoriesAdmin isOpen={isModalOpen} onClose={closeModal}
                title={currentItem ? 'Edit Category' : 'Add Category'}
                subtitle={currentItem ? 'Update Data' : 'Add Data'}
                position={position}
                currentItem={currentItem} />

            <ToastContainer />
        </>
    )
}
