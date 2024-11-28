import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import '../css/HeroSection.css';  // Import the CSS file

const HeroSection = () => {
    return (
        <Box className="hero-container">
            <Typography variant="h2" className="hero-title">
                Welcome to FitTracker!
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
                Track your workouts and stay fit.
            </Typography>
            <Button variant="contained" color="primary" size="large">
                Get Started
            </Button>
        </Box>
    );
};

export default HeroSection;
