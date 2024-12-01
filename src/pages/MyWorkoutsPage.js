import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/MyWorkoutsPage.css';  // Import the custom CSS file
import AddWorkoutModal from '../components/AddWorkoutModal';  // Import your modal component

const MyWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (or AuthContext)

      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const data = await response.json();

      if (Array.isArray(data.workouts)) {
        setWorkouts(data.workouts);
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
  }, []);

  // Trigger re-fetch after adding a workout
  const handleWorkoutAdded = () => {
    fetchWorkouts(); // Refresh the workouts list
  };

  return (
    <Container className="my-workouts-container">
      <h1 className="my-workouts-title text-center">My Workouts</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="my-3">
      <AddWorkoutModal onWorkoutAdded={handleWorkoutAdded} />
      </div>
      <Row>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Col key={workout._id} md={4} className="mb-4">
              <Card className="workout-card">
                <Card.Body className="workout-card-body">
                  <Card.Title className="workout-card-title">{workout.name}</Card.Title>
                  <Card.Subtitle className="mb-2 workout-card-status">{workout.status}</Card.Subtitle>
                  <Card.Text className="workout-card-text">
                    <strong>Duration:</strong> {workout.duration} <br />
                    <strong>Date Added:</strong> {new Date(workout.dateAdded).toLocaleDateString()}
                  </Card.Text>
                  <Button className="workout-card-button" size="sm">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No workouts available.</p>
        )}
      </Row>
    </Container>
  );
};

export default MyWorkoutsPage;
