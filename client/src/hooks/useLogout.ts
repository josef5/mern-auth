import { useState } from "react";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  /**
   * This function logs the user out by sending a request to the server to invalidate the user's session. isFetching and error are unlikely to be useful in the context of a logout operation, but they are included for consistency with the other hooks.
   *
   * @return {Promise<void>} This function does not return anything explicitly, but it performs the logout operation asynchronously.
   */
  const logout = async () => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setError("");
    } catch (error) {
      console.error(error);

      setError("There was an error logging out");
    } finally {
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  return { logout, isFetching, error };
};

export default useLogout;
