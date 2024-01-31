// Favorites.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    console.log(storedFavorites);
  }, []);
  const handleFavoriteClick = (favorite) => {
    navigate('/', { state: { selectedCity: favorite.name } });
  };
  return (
    <div className="favorites-container">
    <h2>Favorites</h2>
    <ul className="favorites-list">
      {favorites.map((favorite, index) => (
        <li key={index} className="favorite-item" onClick={() => handleFavoriteClick(favorite)}>
       
          {favorite.name}  
          <img
            className="weather-icon"
            src={`https://developer.accuweather.com/sites/default/files/${
              favorite.icon < 10 ? '0' : ''
            }${favorite.icon}-s.png`}
            alt=""
          />
           <b>{favorite.temperature} °</b>
        </li>
      ))}
    </ul>
  </div>

);

};

export default Favorites;
