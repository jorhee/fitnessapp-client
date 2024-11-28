import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import '../css/FeaturedWorkouts.css';  // Import the CSS file

const FeaturedWorkouts = () => {
    const workouts = [
        { title: 'Push-ups', description: 'A basic bodyweight exercise for the chest and arms.' },
        { title: 'Squats', description: 'A lower-body workout for strengthening your legs and glutes.' },
        { title: 'Plank', description: 'A core-strengthening exercise that targets your abs and back.' },
    ];

    return (
        <Box className="workouts-container">
            <Typography variant="h4" className="section-title">
                Featured Workouts
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {workouts.map((workout, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Paper className="workout-card">
                            <Typography variant="h6" className="workout-title">
                                {workout.title}
                            </Typography>
                            <Typography variant="body1" className="workout-description">
                                {workout.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeaturedWorkouts;
