import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-links">
        <Link to={'/'} className="header-link">
          Home
        </Link>
        <Link to={'/fav'} className="header-link">
          Favorites
        </Link>
      </div>
    </div>
  )

}
