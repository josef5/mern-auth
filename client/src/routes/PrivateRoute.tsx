import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isError, setIsError] = useState(false);

  /* const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)); */

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setIsFetching(true);

      try {
        const response = await fetch("/auth/status");
        const data = await response.json();

        // await sleep(2000);

        if (!response.ok) {
          throw new Error(data.message);
        }

        setIsAuth(data.isAuthenticated);
        setIsFetching(false);
        setIsError(false);
      } catch (error) {
        console.error(error);

        setIsError(true);
        setIsAuth(false);
        setIsFetching(false);
      }
    };

    fetchAuthStatus();
  }, []);

  // console.log({ isFetching, isAuth, isError });

  if (isFetching) {
    return <div>Loading1...</div>;
  }

  if (isError) {
    return <div>There was an error</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
