import React, { useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../css/HeroSection.css'; // Import the CSS file

const HeroSection = () => {
    const { isAuthenticated } = useContext(AuthContext); // Accessing authentication state from context

    return (
        <Box className="hero-container">
            <Typography variant="h2" className="hero-title">
                Welcome to JorHee Fitness Tracker!
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
                Track your workouts and stay fit.
            </Typography>

            {/* Conditionally render buttons based on authentication status */}
            {!isAuthenticated ? (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link} // Use Link as the component
                    to="/login" // Navigate to the login page
                    className="my-5"
                >
                    Get Started
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link} // Use Link as the component
                    to="/workouts" // Navigate to workouts page
                    className="my-5"
                >
                    Go to Workouts
                </Button>
            )}
        </Box>
    );
};

export default HeroSection;
