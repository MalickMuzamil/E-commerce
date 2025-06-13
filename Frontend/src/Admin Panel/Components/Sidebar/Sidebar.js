import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../../../Redux/SearchBar Reducer/SearchBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {

    const [username, setUsername] = useState('');
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const [hasSearched, setHasSearched] = useState(false);

    const ResultQuery = useSelector((state) => state.search_query.query);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'Guest');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
            dispatch(SearchBar(query.trim()));

        }
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    };

    return (
        <>
0            <nav className="sb-topnav navbar navbar-expand sidebar">
                <Link className="navbar-brand brand-name ps-3" to="/admin">Shopping Store</Link>
                <form onSubmit={handleSearch} className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 me-3" >
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <button type="submit" className='bg-white border-0'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className='p-1'
                        />
                    </div>
                </form>

                {hasSearched && (
                    ResultQuery.length > 0 ? (
                        <ul className="dropdown-menu navbar-drop show">
                            <li className="dropdown-header">Searched Product</li>
                            {ResultQuery.map((result) => (
                                <li key={result._id} className="dropdown-item">
                                    <div className="dropdown-item-content">
                                        <div>
                                            <span className="label">Category:</span> {result.category}
                                        </div>
                                        <div>
                                            <span className="label">Brand:</span> {result.brand}
                                        </div>
                                        <div>
                                            <span className="label">OutFit:</span> {result.type}
                                        </div>
                                        <div>
                                            <span className="label">Season:</span> {result.season}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No Results found</p>
                    )
                )}

                <ul className="mb-0 px-0 me-3">
                    <li className="nav-item dropdown list-unstyled">
                        <button
                            href="/"
                            className="nav-link fw-bold text-decoration-none text-white me-5 pe-5"
                            id="dropdownMenuButton4"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Settings
                        </button>
                        <ul className="dropdown-menu drop-chat-logout" aria-labelledby="dropdownMenuButton4">
                            <li><Link to="/" className="dropdown-item" onClick={handleLogout} >Logout</Link></li>
                        </ul>
                    </li>

                </ul>

            </nav>

            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link to="/admin" className="nav-link sidebar-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>


                            <Link to="category" className="nav-link sidebar-link" >
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Categories
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as : {username ? username : 'Guest'} ! </div>
                    </div>
                </nav >
            </div >
        </>
    )
}
