import { useState } from "react";
import useAuth from "./useAuth";

const useRegister = () => {
  const { setAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  /**
   * Register a new user with the given username and password.
   *
   * @param {string} username - the username of the new user
   * @param {string} password - the password of the new user
   * @return {void}
   */
  const register = async (username: string, password: string) => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAuth({ username: data.username, isAuthenticated: true });
      setIsFetching(false);
      setError("");
    } catch (error) {
      console.error(error);

      setError("There was an error registering the user. Please try again.");
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  return { register, isFetching, error };
};

export default useRegister;
