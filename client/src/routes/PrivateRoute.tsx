import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth, fetchAuthStatus, /* isFetching, */ error } = useAuth();

  useEffect(() => {
    (async () => {
      await fetchAuthStatus();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("auth.isAuthenticated :", auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    // if (!isAuth) {
    return <Navigate to="/login" />;
  }

  /* if (isFetching) {
    return <div>Loading...</div>;
  } */

  if (error !== "") {
    return <div>{error}</div>;
  }

  return children;
};

export default PrivateRoute;
