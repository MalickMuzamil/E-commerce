import React, { useState, useEffect } from 'react';
import './AddCategoryAdmin.css';
import { useDispatch } from 'react-redux';
import { postCategories, updateCategory,fetchpostCategories } from '../../Redux/Reducers/CategoryReducer.js';
import { postMensCategories, updateMenCategory, fetchMensCategories } from '../../Redux/Reducers/MensCategory.js';
import { postWomenCategories, updateWomenCategory, fetchWomensCategories } from '../../Redux/Reducers/WomensReducer.js';
import { postKidsCategories, updateKidsCategory, fetchKidsCategories } from '../../Redux/Reducers/KidsReducer.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategoryAdmin({ isOpen, onClose, title, position, subtitle, currentItem }) {
    const dispatch = useDispatch();
    const [row, setRow] = useState({ category: '', type: '', season: '', brand: '', price: '', stock: '', image: null });

    useEffect(() => {
        if (isOpen && currentItem) {
            setRow(currentItem);
        } else if (isOpen) {
            setRow({ category: '', type: '', season: '', brand: '', price: '', stock: '', image: '' });
        }
    }, [isOpen, currentItem]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRow({ ...row, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setRow({ ...row, image: file });
    };

    const handleSubmit = () => {
        if (currentItem) {
            if (position === "MensPage") {
                dispatch(updateMenCategory({ id: currentItem._id, updatedData: row }))
                    .then(() => {
                        toast.success("Category successfully updated!");
                        dispatch(fetchMensCategories())
                    })
                    .catch(() => {
                        toast.error("Error updating category.");
                    });
            } else if (position === "WomensPage") {
                dispatch(updateWomenCategory({ id: currentItem._id, updatedData: row }))
                    .then(() => {
                        toast.success("Category successfully updated!");
                        dispatch(fetchWomensCategories())
                    })
                    .catch(() => {
                        toast.error("Error updating category.");
                    });
            } else if (position === "KidsPage") {
                dispatch(updateKidsCategory({ id: currentItem._id, updatedData: row }))
                    .then(() => {
                        toast.success("Category successfully updated!");
                        dispatch(fetchKidsCategories())
                    })
                    .catch(() => {
                        toast.error("Error updating category.");
                    });
            } else {
                dispatch(updateCategory({ id: currentItem._id, updatedData: row }))
                    .then(() => {
                        toast.success("Category successfully updated!");
                        dispatch(fetchpostCategories())
                    })
                    .catch(() => {
                        toast.error("Error updating category.");
                    });
            }
        } else {
            if (position === "MensPage") {
                dispatch(postMensCategories(row))
                    .then(() => {
                        toast.success("Category successfully added!");
                        dispatch(fetchMensCategories())
                    })
                    .catch(() => {
                        toast.error("Error adding category.");
                    });
            } else if (position === "WomensPage") {
                dispatch(postWomenCategories(row))
                    .then(() => {
                        toast.success("Category successfully added!");
                        dispatch(fetchWomensCategories());
                    })
                    .catch(() => {
                        toast.error("Error adding category.");
                    });
            } else if (position === "KidsPage") {
                dispatch(postKidsCategories(row))
                    .then(() => {
                        toast.success("Category successfully added!");
                        dispatch(fetchKidsCategories());
                    })
                    .catch(() => {
                        toast.error("Error adding category.");
                    });
            } else {
                dispatch(postCategories(row))
                    .then(() => {
                        toast.success("Category successfully added!");
                    })
                    .catch(() => {
                        toast.error("Error adding category.");
                    });
            }
        }
        setRow({ category: '', type: '', season: '', brand: '', price: '', stock: '', image: null });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-card modal-card-add-category" onClick={(e) => e.stopPropagation()}>
                <span className="card__title">{title}</span>
                <span className="close-button" onClick={onClose}>&times;</span>
                <p className="card__content">{subtitle}</p>
                <div className="card__form">
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
                                        <tr>
                                            <td><input type="text" className="form-control text-center" name="category" value={row.category} onChange={handleInputChange} /></td>

                                            <td><input type="text" className="form-control text-center" name="brand" value={row.brand} onChange={handleInputChange} /></td>

                                            <td><input type="text" className="form-control text-center" name="type" value={row.type} onChange={handleInputChange} /></td>

                                            <td><input type="text" className="form-control text-center" name="season" value={row.season} onChange={handleInputChange} /></td>

                                            <td><input type="text" className="form-control text-center" name="price" value={row.price} onChange={handleInputChange} /></td>


                                            <td><input type="number" className="form-control text-center" name="stock" value={row.stock} onChange={handleInputChange} /></td>


                                            <td><input type="file" className="form-control text-center" name="image" accept="image/*" onChange={handleFileChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="sign-up" onClick={handleSubmit}>{currentItem ? 'Update Data' : 'Add Data'}</button>
            </div>
        </div>
    );
}
