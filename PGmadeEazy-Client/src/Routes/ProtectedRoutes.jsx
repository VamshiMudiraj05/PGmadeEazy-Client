import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthState";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state } = useAuth();
  const { isAuthenticated, userType } = state;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // If no specific roles are required, allow access
  if (!allowedRoles) {
    return children;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(userType)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardPath = userType === 'seeker' ? '/seeker-dashboard' : '/provider-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.oneOf(['seeker', 'provider']))
};

export default ProtectedRoute;
