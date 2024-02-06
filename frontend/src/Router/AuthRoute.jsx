import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/Auth';

function AuthRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user 
      ? <Navigate to="/" state={{ from: location }} replace />
      : <Outlet /> 
  )
}

export default AuthRoute