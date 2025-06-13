import React, { useState } from 'react'
import './Signup.css'
import backgroundimage from '../../images/LoginPic.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = "/signup";
    const navigate = useNavigate();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const NewUser = async (e) => {
        e.preventDefault();

        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (username.trim() === "" || email.trim() === "" || !emailRegex.test(email.trim()) || password.trim() === "") {
                toast.error("Please enter valid credentials", { position: "top-center" });
            }

            let body = {
                Username: username,
                Email: email,
                Password: password
            };

            const response = await axios.post(`http://localhost:3001${url}`, body);
            console.log(response);

            const { role, name, token } = response.data;
            localStorage.setItem('username', name);
            localStorage.setItem('role', role);
            localStorage.setItem('authToken', token);

            if (role === 'admin') {
                toast.success(`Welcome ${name}!`);
                await delay(3000);
                navigate('/admin');
            }

            else {
                toast.success(`Welcome ${name}!`);
                await delay(3000);
                navigate('/home');
            }

            setUsername('');
            setEmail('');
            setPassword('');
        }

        catch (error) {
            console.error("Signup Post Request Error:", error);
            toast.error('SignUp Failed', { position: "top-center" });
        }
    };


    return (
        <>

            <div className="container-fluid">
                <div className="row text-center align-items-center">
                    <div className="col-12 col-md-6 px-0">
                        <img src={backgroundimage} alt="Error" className="img-fluid img-class" />
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <div className="form-container">
                            <p className="title">Register Now</p>

                            <form className="form" onSubmit={NewUser}>
                                <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <p className="page-link">

                                </p>
                                <button type="submit" className='form-btn'>Sign Up</button>
                                <ToastContainer />
                            </form>

                            <p className="sign-up-label">
                                Don't have an account?
                                <Link to='/' className='sign-up-link'>Login</Link>
                            </p>
                            <div className="buttons-container">
                                <div className="apple-login-button">
                                    <FontAwesomeIcon icon={faApple} className="apple-icon" />
                                    <span> Log in with Apple</span>
                                </div>
                                <div className="google-login-button">
                                    <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                                    <span> Log in with Google</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
