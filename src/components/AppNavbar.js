import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../pages/LogoutButton';
import AddWorkoutModal from '../components/AddWorkoutModal';
import '../css/Nav.css';

const Navbar = () => {

    const { user } = useContext(AuthContext); 

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FitTracker
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={NavLink} to="/" exact activeClassName="active-link">Home</Button>

            {user ? (
              <>
                <Button color="inherit" component={NavLink} to="/my-workouts" activeClassName="active-link">My Workouts</Button>
                <AddWorkoutModal />
                <LogoutButton />
              </>
            ) : (
              <>
                <Button color="inherit" component={NavLink} to="/login" activeClassName="active-link">Login</Button>
                <Button color="inherit" component={NavLink} to="/register" activeClassName="active-link">Register</Button>
              </>
            )}
          </Box>

          {/* Mobile responsiveness using Bootstrap */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button color="inherit" component={NavLink} to="/" exact activeClassName="active-link">Home</Button>

            {user ? (
              <>
                <Button color="inherit" component={NavLink} to="/my-workouts" activeClassName="active-link">My Workouts</Button>
                <Button color="inherit" component={NavLink} to="/add-workout" activeClassName="active-link">Add Workouts</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={NavLink} to="/login" activeClassName="active-link">Login</Button>
                <Button color="inherit" component={NavLink} to="/register" activeClassName="active-link">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
