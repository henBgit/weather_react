import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteClick = (favorite) => {
    navigate('/', { state: { selectedCity: favorite.name } });
  };

  const handleDeleteClick = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1); // Remove the selected favorite
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <ul className="favorites-list">
        {favorites.map((favorite, index) => (
          <li key={index} className="favorite-item">
            <div className="favorite-info" onClick={() => handleFavoriteClick(favorite)}>
              {favorite.name}
              <img
                className="weather-icon"
                src={`https://developer.accuweather.com/sites/default/files/${favorite.icon < 10 ? '0' : ''
                  }${favorite.icon}-s.png`}
                alt=""
              />
              <b>{favorite.temperature} °</b> &nbsp;&nbsp;&nbsp;

              <button className="delete-btn" onClick={() => handleDeleteClick(index)}>
               X
            </button>
            </div>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
