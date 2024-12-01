import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import { ArrowBack, AccessTime, CalendarToday, FitnessCenter, AccessibilityNew } from '@mui/icons-material';
import { Notyf } from 'notyf'; // Importing Notyf
import 'notyf/notyf.min.css'; // Import Notyf styles
import '../css/WorkoutDetailsPage.css';

const WorkoutDetailsPage = () => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({ name: '', duration: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Initialize Notyf instance
  const notyf = new Notyf();

  // Fetch workout details from the API
  const fetchWorkoutDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/${workoutId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to fetch workout details');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWorkout(data.workout);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching workout details.');
      setLoading(false);
    }
  }, [workoutId]);

  useEffect(() => {
    fetchWorkoutDetails();
  }, [fetchWorkoutDetails]);

  // Handle form change for editing workout
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  // Handle saving the updated workout details
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        setError('Failed to update workout details');
        return;
      }

      // Successfully saved, exit edit mode
      setIsEditing(false);
      
      // Show success notification using Notyf
      notyf.success('Workout updated successfully!');
    } catch (err) {
      setError('An error occurred while updating the workout.');
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode without saving
    notyf.error('Edit canceled. No changes were made.'); // Show cancel notification
  };

  // Handle workout deletion with custom confirmation modal
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workoutId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to delete workout');
        return;
      }

      // Show success notification after deletion
      notyf.success('Workout deleted successfully!');

      // Navigate back to the workouts page after deletion
      navigate('/workouts');
    } catch (err) {
      setError('An error occurred while deleting the workout.');
    }
  };

  // Toggle delete modal visibility
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  return (
    <Container className="workout-details-container">
      <Row className="my-3 ms-3">
        <Col>
          <IconButton 
            onClick={() => navigate(-1)} 
            color="primary"
            style={{
              backgroundColor: 'gray',
              padding: '8px', // optional, adjust padding if needed
              fontSize: '8rem', // Adjust icon size if needed
            }}
          >
            <ArrowBack />
          </IconButton>
        </Col>
      </Row>
      {loading ? (
        <Row className="justify-content-center">
          <CircularProgress />
        </Row>
      ) : error ? (
        <Row>
          <Col>
            <Typography color="error" component="span">{error}</Typography>
          </Col>
        </Row>
      ) : workout ? (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="workout-details-card">
              <Card.Body>
                <Card.Title>
                  <AccessibilityNew fontSize="small" style={{ marginRight: '8px' }} />
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      placeholder="Workout Name"
                      name="name"
                      value={workout.name}
                      onChange={handleChange}
                    />
                  ) : (
                    workout.name
                  )}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <Typography variant="body2" component="span">
                    <FitnessCenter fontSize="small" style={{ marginRight: '8px' }} />
                    Status: 
                    {isEditing ? (
                      <Form.Control
                        as="select"
                        name="status"
                        value={workout.status}
                        onChange={handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Started">Started</option>
                        <option value="Pending">Pending</option>
                      </Form.Control>
                    ) : (
                      workout.status
                    )}
                  </Typography>
                </Card.Subtitle>
                <Row>
                  <Col>
                    <Typography variant="body1" component="div" className="workout-details-item">
                      <AccessTime fontSize="small" style={{ marginRight: '8px' }} />
                      <strong>Duration:</strong>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="duration"
                          value={workout.duration}
                          onChange={handleChange}
                        />
                      ) : (
                        workout.duration
                      )}
                    </Typography>
                  </Col>
                  <Col>
                    <Typography variant="body1" component="div" className="workout-details-item">
                      <CalendarToday fontSize="small" style={{ marginRight: '8px' }} />
                      <strong>Date Added:</strong> {new Date(workout.dateAdded).toLocaleDateString()}
                    </Typography>
                  </Col>
                </Row>

                {/* Show "Save/Cancel" buttons if in editing mode */}
                {isEditing ? (
                  <div>
                    <Button variant="primary" onClick={handleSave} className="mt-3">
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} className="mt-3 ml-2">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => setIsEditing(true)} className="mt-3">
                    Edit Workout
                  </Button>
                )}

                {/* Delete Button to trigger modal */}
                <Button variant="danger" onClick={toggleDeleteModal} className="mt-3 ml-2">
                  Delete Workout
                </Button>

                {/* Custom Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={toggleDeleteModal} centered>
                  <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-danger">
                    Are you sure you want to delete this workout? This action cannot be undone.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDeleteModal}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Typography component="span">No workout found.</Typography>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WorkoutDetailsPage;
