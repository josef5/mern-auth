import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth, fetchAuthStatus, isFetching, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await fetchAuthStatus();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("auth.isAuthenticated :", auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isFetching) {
    // return <div>Loading...</div>;
  }

  if (error !== "") {
    return <div>{error}</div>;
  }

  return children;
};

export default PrivateRoute;
