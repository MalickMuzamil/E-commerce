import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

export default function Card({ image, title, button_title, linkPath }) {
  return (
    <>
      <div className="card">
        <img src={image} alt="Error" className="card-image" />
        <div className="card-content">
          <div className="card-center-text">
            <h3 className="card-title">{title}</h3>
            <Link to={linkPath} className="card-title">{button_title}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
