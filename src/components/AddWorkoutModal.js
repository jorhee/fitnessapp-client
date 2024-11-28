import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddWorkoutModal = () => {
  const [open, setOpen] = useState(false); // State to open/close modal
  const [name, setName] = useState(''); // State for workout name
  const [duration, setDuration] = useState(''); // State for workout duration
  const [error, setError] = useState(null); // Error state to show validation messages
  const navigate = useNavigate();

  // Handle modal open
  const handleOpen = () => setOpen(true);

  // Handle modal close
  const handleClose = () => setOpen(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !duration) {
      setError('Both Name and Duration are required!');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addworkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ name, duration }),
      });

      if (!response.ok) {
        throw new Error('Error adding workout');
      }

      const data = await response.json();

      // Handle successful response, reset form and close modal
      setName('');
      setDuration('');
      handleClose();
      navigate('/my-workouts'); // Redirect to "My Workouts" page or another page
    } catch (error) {
      // Handle error
      setError(error.message);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Workout
      </Button>

      {/* Modal for adding workout */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="addWorkout"
        aria-describedby="addWorkoutModal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            width: 400,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Workout
          </Typography>
          
          {/* Error message */}
          {error && <Typography color="error" gutterBottom>{error}</Typography>}

          {/* Workout form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Workout Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Duration (minutes)"
              variant="outlined"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              margin="normal"
              type="number"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddWorkoutModal;
