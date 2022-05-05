import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, redirectPath = "/" }) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
