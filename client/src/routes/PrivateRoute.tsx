import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthStatus from "../hooks/useAuthStatus";

/**
 * A higher-order component that renders its child component if the user is authenticated, else redirects to the login page.
 *
 * @param {object} children - The child components to be rendered if the user is authenticated.
 * @return {React.ReactNode} The rendered child components or a redirect to the login page.
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  const { setAuthStatus, isFetching, error } = useAuthStatus();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await setAuthStatus();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isFetching) {
    // Causes flash of loading view
    // return <div>Loading...</div>;
  }

  if (error !== "") {
    return <div>{error}</div>;
  }

  return children;
};

export default PrivateRoute;
