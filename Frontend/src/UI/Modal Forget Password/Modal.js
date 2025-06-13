import React, { useState } from 'react';
import './Modal.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            console.log(otpSent)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sendOTP`, { email });

            if (response.data.success) {
                setOtpSent(true);
                const otp = response.data.otp;
                toast.success(`OTP has been sent to your email. Your OTP is: ${otp}`);

                setTimeout(() => {
                    navigate("/ForgetPassword");
                }, 4000);
            }

            else if (response.status === 404) {
                toast.error("User not found. Please register.");
            }

            else {
                toast.error("Failed to send OTP.");
            }
        }

        catch (error) {
            alert('Error sending OTP: ' + error.message);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <span className="card__title">Forget Password</span>
                <span className="close-button" onClick={onClose}>&times;</span>
                <p className="card__content">Enter your email to send OTP</p>
                <div className="card__form">
                    <input
                        placeholder="Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="button-modal" onClick={handleSendOtp}>Send OTP</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Modal;
