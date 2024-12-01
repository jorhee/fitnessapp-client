import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';  // React-Bootstrap components
import { CircularProgress } from '@mui/material';  // Correct import from @mui/material
import '../css/FeaturedWorkouts.css';  // Import the CSS file

const FeaturedWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch workouts
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError('Please login.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts?limit=3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const data = await response.json();

      // Ensure that we only get the last 3 workouts
      if (Array.isArray(data.workouts)) {
        // Filter to show only workouts with a "completed" status
        const completedWorkouts = data.workouts.filter(workout => workout.status === 'Completed');
        setWorkouts(completedWorkouts);
      } else {
        throw new Error('Invalid data format');
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching workouts.');
      setLoading(false);
    }
  };

  // Fetch workouts when the component mounts
  useEffect(() => {
    fetchWorkouts();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Container className="my-workouts-container">
      <h1 className="my-workouts-title text-center">My Completed Workouts</h1>
      {loading && <CircularProgress />}  {/* Display loading spinner from MUI */}
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Col key={workout._id} md={4} className="mb-4">
              <Card className="workout-card">
                <Card.Body className="workout-card-body">
                  <Card.Title className="workout-card-title">{workout.name}</Card.Title>
                  <Card.Subtitle className="mb-2 workout-card-status">{workout.status}</Card.Subtitle>
                  <Card.Text className="workout-card-text">
                    <strong>Duration:</strong> {workout.duration} minutes <br />
                    <strong>Date Added:</strong> {new Date(workout.dateAdded).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No completed workouts available.</p>
        )}
      </Row>
    </Container>
  );
};

export default FeaturedWorkouts;
