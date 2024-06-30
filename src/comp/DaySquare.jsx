
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

export default function DaySquare({ dayData, onClose }) {
  
  const { date, Temperature, Day, Night } = dayData;

  return (
    <Card className="day-square">
      <CardContent>
        <Typography variant="h5" color="primary">
          {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
        </Typography>
        <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
        <div className="day-square-content">
          <Typography variant="h6">Temperature: {Temperature}°</Typography>
          <div className="day-info">
            <Typography variant="subtitle1">Day</Typography>
            <img
              className="weather-icon"
              src={`https://developer.accuweather.com/sites/default/files/${Day.Icon < 10 ? '0' : ''}${Day.Icon}-s.png`}
              alt=""
            />
            <Typography>{Day.IconPhrase}</Typography>
          </div>
          <div className="night-info">
            <Typography variant="subtitle1">Night</Typography>
            <img
              className="weather-icon"
              src={`https://developer.accuweather.com/sites/default/files/${Night.Icon < 10 ? '0' : ''}${Night.Icon}-s.png`}
              alt=""
            />
            <Typography>{Night.IconPhrase}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
    