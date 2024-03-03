import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [, setIsFetching] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const [isError, setIsError] = useState(false);
  const { auth, setAuth } = useAuth();

  /* const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)); */

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setIsFetching(true);

      try {
        const response = await fetch("/auth/status");
        const data = await response.json();
        console.log("data :", data);

        // await sleep(2000);

        if (!response.ok) {
          throw new Error(data.message);
        }

        // setIsAuth(data.isAuthenticated);
        setAuth({
          username: data.username,
          isAuthenticated: data.isAuthenticated,
        });
        setIsFetching(false);
        setIsError(false);
      } catch (error) {
        console.error(error);

        setIsError(true);
        // setIsAuth(false);
        setAuth({ username: "", isAuthenticated: false });
        setIsFetching(false);
      }
    };

    fetchAuthStatus();
  }, [setAuth]);

  // console.log({ isFetching, isAuth, isError });
  console.log("auth.isAuthenticated :", auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    // if (!isAuth) {
    return <Navigate to="/login" />;
  }

  /* if (isFetching) {
    return <div>Loading...</div>;
  } */

  if (isError) {
    return <div>There was an error</div>;
  }

  return children;
};

export default PrivateRoute;
