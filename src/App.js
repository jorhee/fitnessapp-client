import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import LogoutButton from './pages/LogoutButton';
import WorkoutDetailsPage from './pages/WorkoutDetailsPage';


import Profile from './pages/Profile';
import Register from './pages/Register';
import MyWorkoutsPage from './pages/MyWorkoutsPage';





function App() {
  return (
    <>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AppNavbar />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<MyWorkoutsPage />} />
            <Route path="/workouts/:workoutId" element={<WorkoutDetailsPage />} />
            <Route path="/addworkout" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router> 
    </>
  );
}

export default App;
