import React from 'react';
import { Typography, Card, CardContent, Container, Grid, Button } from '@mui/material';

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <Container className="favorites-container" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((favorite, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="favorite-item" style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {favorite.cityName}
                </Typography>
                <Typography variant="body1">
                  Temperature: {favorite.temperature}°
                </Typography>
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${favorite.icon < 10 ? '0' : ''}${favorite.icon}-s.png`}
                  alt="weather icon"
                  style={{ width: '50px', height: '50px', marginTop: '10px' }}
                />
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: '10px' }}
                onClick={() => {
                  const newFavorites = favorites.filter((_, i) => i !== index);
                  localStorage.setItem('favorites', JSON.stringify(newFavorites));
                  window.location.reload(); // Reload to reflect changes
                }}
              >
                Remove
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
