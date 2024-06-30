
import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActions, Button, Grid , Box } from '@mui/material';
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
      <Typography variant="h4" component="div">{cityName}</Typography>
      <div className="temperature-container">
        <Typography variant="h3">{temperature}°</Typography>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${weatherIcon < 10 ? '0' : ''}${weatherIcon}-s.png`}
          alt=""
        />
        {weatherText && <Typography variant="subtitle1">{weatherText}</Typography>}
      </div>
      <Grid container spacing={2} className="day-cards-container">
        {dayscraft.map((day, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card onClick={() => handleDayClick(day)} className="day-card">
              <CardContent>
                <Typography variant="h6">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</Typography>
                <Typography variant="h5">{day.Temperature}°</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedDay && <DaySquare dayData={selectedDay} onClose={handleCloseDaySquare} />}
    </div>
  );
}
    