import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  const { setAuthStatus, isFetching, error } = useAuthStatus();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await setAuthStatus();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log("auth.isAuthenticated :", auth.isAuthenticated);
  console.log("auth :", auth);

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
