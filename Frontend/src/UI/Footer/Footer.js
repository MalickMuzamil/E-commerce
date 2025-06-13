import React from 'react'
import './Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <h6>SIGN UP NOW & GET 10% OFF</h6>
                            <p className="text-justify mt-4 mb-0">Get timely updates from your favorite products</p>

                            <div className='my-3'>
                                <form action="https://api.web3forms.com/submit" method="POST">
                                    <input type="hidden" name="access_key" value="73b87a61-fb57-4163-92fa-d62a2c89453e" />
                                    <div className="input-group">
                                        <input type="email" className="input-footer" id="Email" name="email" placeholder="Email Address *" required />
                                        <input className="button-submit" value="Subscribe" type="submit" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>CONTACT INFO</h6>
                            <ul className="footer-links">
                                <li>Phone: 888-999-000-1425</li>
                                <li>Email: azedw@mail.com</li>
                                <li>Address: 22/1 national city austria, dream land</li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>COMPANY</h6>
                            <ul className="footer-links">
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/home">Best Services</Link></li>
                                <li><Link to="/home">Recent insight</Link></li>
                                <li><Link to="/Outfit/:season">Shopping Guide</Link></li>
                                <li><Link to="/blog">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-2">
                            <h6>PAYMENT & SHIPPING</h6>
                            <ul className="footer-links">
                                <li><a href="/cartDetails">Payment method</a></li>
                                <li><a href="/about">Terms of use</a></li>
                                <li><Link to="/blog">Shipping policy</Link></li>
                                <li><Link to="/Outfit/:season">Shopping Guide</Link></li>
                                <li><Link to="/blog">Return policy</Link></li>
                            </ul>
                        </div>


                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2021 WP Studio , All Rights Reserved.
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="twitter" href="/"> <FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li><a className="twitter" href="/"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                <li><a className="dribbble" href="/"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a className="linkedin" href="/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
