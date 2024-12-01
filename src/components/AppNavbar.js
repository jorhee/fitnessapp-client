import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../pages/LogoutButton';
import AddWorkoutModal from '../components/AddWorkoutModal';
import '../css/AppNavbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const NavLinkButton = ({ to, children, exact }) => (
    <NavLink
      to={to}
      exact={exact}
      className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
    >
      {({ isActive }) => (
        <Button
          color="inherit"
          sx={{
            color: isActive ? 'yellow' : 'white',
            textDecoration: 'none',
          }}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );

  return (
    <AppBar position="sticky" color="primary" className="navbar">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FitTracker
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLinkButton to="/" exact="true">
              Home
            </NavLinkButton>

            {user ? (
              <>
                <NavLinkButton to="/workouts">
                  My Workouts
                </NavLinkButton>
                <AddWorkoutModal />
                <LogoutButton />
              </>
            ) : (
              <>
                <NavLinkButton to="/login">
                  Login
                </NavLinkButton>
                <NavLinkButton to="/register">
                  Register
                </NavLinkButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
