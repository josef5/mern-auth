import { useState } from "react";
import useAuth from "./useAuth";

const useLogin = () => {
  const { setAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const login = async (username: string, password: string) => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/login", {
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

      setError("There was an error logging in. Please try again.");
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  return { login, isFetching, error };
};

export default useLogin;
