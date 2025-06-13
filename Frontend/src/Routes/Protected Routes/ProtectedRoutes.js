import React from 'react';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ element }) {
    const userRole = localStorage.getItem('role');
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
        if (userRole === 'admin') {
            return element;
        }

        else if (userRole === "user") {
            return element;
        }

        else {
            return <Navigate to="/" />;
        }
    }

    else {
        return <Navigate to="/" />;
    }
}