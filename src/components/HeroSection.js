import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import '../css/HeroSection.css'; // Import the CSS file

const HeroSection = () => {
    return (
        <Box className="hero-container">
            <Typography variant="h2" className="hero-title">
                Welcome to FitTracker!
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
                Track your workouts and stay fit.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link} // Use Link as the component
                to="/login" // Navigate to the login page
            >
                Get Started
            </Button>
        </Box>
    );
};

export default HeroSection;
