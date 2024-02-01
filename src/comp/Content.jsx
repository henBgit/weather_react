import React, { useState } from 'react';
import DaySquare from './DaySquare';

export default function Content({ cityName, temperature, dayscraft, weatherText, weatherIcon }) {
  
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleCloseDaySquare = () => {
    setSelectedDay(null);
  };

  return (
    <div className="content-container">
      <p >{cityName}</p>
      <div className="temperature-container">
        <b>{temperature}°</b>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${weatherIcon < 10 ? '0' : ''}${weatherIcon}-s.png`}
          alt=""
        />
        {weatherText && <p>{weatherText}</p>}
      </div>
      <div className="day-cards-container">
        {dayscraft.map((day, index) => (
          <div key={index} className="day-card" onClick={() => handleDayClick(day)}>
            <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p>{day.Temperature}°</p>
          </div>
        ))}
      </div>
      {selectedDay && <DaySquare dayData={selectedDay} onClose={handleCloseDaySquare} />}
    </div>
  );
}
