import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Weather from './comp/Weather';
import Favorites from './comp/Favorites';
import Header from './comp/Header';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <CssBaseline />
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/fav" element={<Favorites />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
