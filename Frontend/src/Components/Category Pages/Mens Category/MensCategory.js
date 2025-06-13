import React from 'react'
import Navbars from '../../Navbar/Navbars'
import Footer from '../../../UI/Footer/Footer.js'
import CardData from '../../../UI/Card Data Fetch/CardData.js';
import './MensCategory.css';

export default function MensCategory() {
    return (
        <>
            <Navbars />

            <div className="container-fluid background-color">
                <div className="row">
                    <div className="col">
                        <CardData />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
