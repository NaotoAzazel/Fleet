import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/Auth';

function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return ( 
    user 
      ? <Outlet /> 
      : <Navigate to="/auth" state={{ from: location }} replace />
  );
}

export default PrivateRoute