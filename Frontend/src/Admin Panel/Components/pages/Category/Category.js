import React from 'react'
import './Category.css'
import Card from '../../../../UI/Card/Card'
import image from '../../../../images/img-4.jpg'
import image2 from '../../../../images/img-7.jpg'
import { Outlet } from 'react-router-dom'

export default function Category() {
    return (
        <>

            <div className="container">
                <div className="row colum-padding-2 ">
                    <div className="col-4">
                        <Card image={image} title="Mens Category" button_title="Mens Data" linkPath="mens" />
                    </div>
                    <div className="col-4">
                        <Card image={image2} title="Women Category" button_title="Women Data" linkPath="women" />
                    </div>
                    <div className="col-4">
                        <Card image={image} title="Kids Category" button_title="Kids Data" linkPath="kid" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
