import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Otp.css'

export default function Otp({ onClose }) {

    const [OTP, setOTP] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const CheckOTP = async () => {
        try {
            console.log(otpSent)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/CheckOTP`,
                {
                    otp: OTP,
                    email: Email,
                    password: Password
                }
            );

            if (response.data.success) {
                setOtpSent(true);
                toast.success(`OTP has been Approved.`);

                setTimeout(() => {
                    toast.success(`Password Changed Successfully.`);
                }, 2000)

                setTimeout(() => {
                    navigate("/");
                }, 4000);
            }

            else {
                toast.error("Invalid OTP. Please try again.");
            }
        }

        catch (error) {
            alert('Error sending OTP: ' + error.message);
        }
    };


    return (
        <>
            <div className="modal" onClick={onClose}>
                <div className="modal-card-otp" onClick={e => e.stopPropagation()}>
                    <span className="card__title">Enter OTP</span>
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <p className="card__content">Enter OTP to verify its you.</p>
                    <div className="card-form">
                        <input
                            placeholder="Enter Valid OTP"
                            type="text"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                        />

                        <input
                            placeholder="Enter Valid Email"
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Enter New Password"
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        <button className="button-modal" onClick={CheckOTP}>Check OTP</button>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    )
}
