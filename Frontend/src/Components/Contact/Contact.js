import React, { useState, useEffect } from 'react'
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbars from '../Navbar/Navbars';
import Image from '../../UI/Imagee/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faMobile, faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../UI/Footer/Footer';

export default function Contact() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setMessage('');
        e.target.submit()
    };

    const navigate = useNavigate();

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
    }, [navigate]);


    return (
        <>

            <Navbars />

            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className='row align-items-center'>
                            <div className="col-2"><FontAwesomeIcon icon={faHouseCircleCheck} className='fs-1' /></div>
                            <div className="col-8">
                                <span>Office address</span>
                                <p>Ali ded frame showed a lady fitted out with fur hat and fur boa who sat upright</p>
                            </div>
                        </div>

                        <div className='row align-items-center my-4'>
                            <div className="col-2"><FontAwesomeIcon icon={faMobile} className='fs-1' /></div>
                            <div className="col-8">
                                <span>Phone number</span>
                                <p className='mb-0'>54875465-65741895-6547</p>
                                <p>2222-3333-4444-555</p>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className="col-2"><FontAwesomeIcon icon={faEnvelope} className='fs-1' /></div>
                            <div className="col-8">
                                <span>Email us</span>
                                <p className='mb-0'>Email Address</p>
                                <p>muzamilteamseven00@gmail.com</p>
                            </div>
                        </div>

                        <div className='row align-items-center my-4'>
                            <div className="col-2"><FontAwesomeIcon icon={faClock} className='fs-1' /></div>
                            <div className="col-8">
                                <span>Office time</span>
                                <p>10AM - 5 PM, Sunday closed</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <div className="form-container">
                            <form className="form" action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="hidden" name="access_key" value="73b87a61-fb57-4163-92fa-d62a2c89453e" />
                                    <label htmlFor="email" className='ms-3'>Company Email</label>
                                    <input type="text" id="email" name="email" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="textarea">How Can We Help You?</label>
                                    <textarea name="textarea" id="textarea" rows="13" cols="50" required="" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className="form-submit-btn w-50" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-0 my-5">
                <div className="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13612.016776149665!2d74.3939335!3d31.469070799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1719575627391!5m2!1sen!2s" width="600" height="450" title='Google Map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <div className="container-fluid">
                <Image />
            </div>

            <Footer />


        </>
    )
}
