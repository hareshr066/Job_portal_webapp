import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import ApplyJob from './pages/ApplyJob';
import AdminPanel from './pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            <Route
              path="/jobs/:id/apply"
              element={
                <ProtectedRoute>
                  <ApplyJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
