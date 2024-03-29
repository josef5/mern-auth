import { useEffect, useState } from "react";
import useAuth from "./useAuth";

/**
 * Set authentication status by fetching data from "/auth/status" endpoint.
 *
 * @param None
 * @return Promise<void> A promise that resolves when the authentication status is set
 */
const useAuthStatus = () => {
  const { setAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const setAuthStatus = async () => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/status");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { username, isAuthenticated } = data;

      setAuth({ username, isAuthenticated });
    } catch (error) {
      console.error(error);

      setError((error as Error).message);
      setAuth({ username: "", isAuthenticated: false });
    } finally {
      setIsFetching(false);
    }
  };

  const useSetAuthStatus = () => {
    useEffect(() => {
      setAuthStatus();
    }, []);
  };

  return { useSetAuthStatus, setAuthStatus, isFetching, error };
};

export default useAuthStatus;
