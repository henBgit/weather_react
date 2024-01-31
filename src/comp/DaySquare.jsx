import React from 'react';


export default function DaySquare({ dayData, onClose }) {
  const { date, Temperature, Day, Night } = dayData;

  return (
    <div className="day-square">
      <div className="day-square-header">
        <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="day-square-content">
        <p className="temperature">Temperature: {Temperature}°</p>
        <div className="day-info">
          <h4>Day</h4>
          <img
            className="weather-icon"
            src={`https://developer.accuweather.com/sites/default/files/${
              Day.Icon < 10 ? '0' : ''
            }${Day.Icon}-s.png`}
            alt=""
          />
          <p>Precipitation: {Day.HasPrecipitation ? 'Yes' : 'No'}</p>
          {Day.HasPrecipitation && (
            <p>
              Precipitation Type: {Day.PrecipitationType}, Intensity: {Day.PrecipitationIntensity}
            </p>
          )}
        </div>
        <hr />
        <div className="night-info">
          <h4>Night</h4>
          <img
            className="weather-icon"
            src={`https://developer.accuweather.com/sites/default/files/${
              Night.Icon < 10 ? '0' : ''
            }${Night.Icon}-s.png`}
            alt=""
          />
          <p>Precipitation: {Night.HasPrecipitation ? 'Yes' : 'No'}</p>
          {Night.HasPrecipitation && (
            <p>
              Precipitation Type: {Night.PrecipitationType}, Intensity: {Night.PrecipitationIntensity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
