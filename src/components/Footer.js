import React from 'react';
import { Typography, Box } from '@mui/material';
import '../css/Footer.css';  // Import the CSS file

const Footer = () => {
    return (
        <Box className="footer-container">
            <Typography variant="body2">
                © 2024 FitTracker. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
