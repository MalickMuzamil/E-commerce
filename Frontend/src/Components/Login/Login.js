import React, { useState, useEffect } from 'react';
import './Login.css';
import backgroundimage from '../../images/LoginPic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../UI/Modal Forget Password/Modal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'
const ClientID = "831451655464-u9vtr2mb0oargpvh1oqurq80d6bsc3ee.apps.googleusercontent.com"

export default function Login() {
    const [isModalOpen, setModalOpen] = useState(false);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const url = "/login";

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const checkRole = async (e) => {

        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const token = localStorage.getItem('authToken');

            let name;

            if (e.email && e.password) {
                email = e.email
                password = e.password
                name = e.name;
            }
            
            if (email.trim() === "" || !emailRegex.test(email.trim()) || password.trim() === "") {
                toast.error("Please enter valid credentials", { position: "top-center" });
                return;
            }

            let body = {
                email: email,
                password: password,
                token: token,
                name: name
            };

            const response = await axios.post(`http://localhost:3001${url}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const { username, role, token } = response.data;

                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                localStorage.setItem('authToken', token);

                if (role === 'admin') {
                    toast.success(`Welcome ${username} !`);
                    await delay(3000);
                    navigate('/admin');
                }

                else if (role === 'user') {
                    toast.success(`Welcome ${username} !`);
                    await delay(3000);
                    navigate('/home');
                }
            }

            else if (response.status === 400) {
                toast.error("Invalid credentials or token. Please try again.", { position: "top-center" });
            }

            else if (response.status === 401) {
                toast.error("User Not Found", { position: "top-center" });
            }

            setEmail("");
            setPassword('');

        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.", { position: "top-center" });
        }
    };

    const onSuccess = async (res) => {
        console.log("Login Success ! Current User: ", res.profileObj)
        const email = res.profileObj.email;
        const googleId = res.profileObj.googleId;
        const token = res.tokenId;
        const name = res.profileObj.name;
        const password = "12345678";

        localStorage.setItem('authToken', token);

        let body = {
            email: email,
            googleId: googleId,
            password: password,
            token: token,
            name: name
        };

        await checkRole(body, url);
        // navigate("/home")
    }

    const onFailure = (res) => {
        console.log("Login Failed", res)
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                ClientID: ClientID,
                scope: ""
            })
        };

        gapi.load('client:auth2', start);
    });


    return (
        <>
            <div className="container-fluid">
                <div className="row text-center align-items-center">
                    <div className="col-12 col-md-6 px-0">
                        <img src={backgroundimage} alt="Error" className="img-fluid img-class" />
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <div className="form-container">
                            <p className="title">Welcome back</p>

                            <form className="form" onSubmit={checkRole}>
                                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <p className="page-link">
                                    <Link className="page-link" onClick={openModal}>Forgot Password?</Link>
                                </p>
                                <button type="submit" className='form-btn' onClick={checkRole}>Log in</button>
                                <ToastContainer />
                            </form>

                            <p className="sign-up-label">
                                Don't have an account?
                                <Link to='/signup' className='sign-up-link'>SignUp</Link>
                            </p>
                            <div className="buttons-container">
                                <div className="apple-login-button">
                                    <FontAwesomeIcon icon={faApple} className="apple-icon" />
                                    <span> Log in with Apple</span>
                                </div>
                                <div className="">
                                    <GoogleLogin
                                        clientId={ClientID}
                                        buttonText='Login With Google'
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={true}
                                        className="google-login-button"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}
