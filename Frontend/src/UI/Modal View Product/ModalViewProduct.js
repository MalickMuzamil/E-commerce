import React, { useState } from 'react'
import productImage2 from '../../images/product-2.jpg'
import './ModalViewProduct.css';
import { AddCart, fetchCart } from '../../Redux/Cart/Cart.js';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalViewProduct({ show, handleClose, product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleCartToggle = async () => {
    try {
      await dispatch(AddCart({ ...product, quantity }));
      toast.success("Product Added to Cart", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: '16px',
          padding: '10px',
        },
      });
      handleClose();
      dispatch(fetchCart())
    }

    catch (error) {
      toast.error("Failed to Add Product to Cart", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: '16px',
          padding: '10px',
        },
      });
    }
  };


  return (
    <>
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog custom-modal-width" role="document">
          <div className="modal-content modal-content-product">
            <div className="modal-header">
              <h5 className="modal-title">{product.category}</h5>
            </div>
            <div className="modal-body">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img src={productImage2} alt="Error" className='product-img' />
                </div>
                <div className="col-md-6 coloum2">
                  <h5 className='fw-bold mb-0'>Brand</h5>
                  <p>{product.brand}</p>
                  <h5 className='fw-bold mb-0'>Price</h5>
                  <p>${product.price}</p>
                  <h5 className='fw-bold mb-0'>Stock</h5>
                  <p>{product.stock}</p>

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
                  <button type="button" className="btn btn-primary" onClick={handleCartToggle}>Add to Cart</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  )
}
