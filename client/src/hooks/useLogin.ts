import { useState } from "react";
import useAuth from "./useAuth";

const useLogin = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { setAuth } = useAuth();
  const [error, setError] = useState("");

  const login = async (username: string, password: string) => {
    console.log({ username, password });

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
      // console.log("data :", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAuth({ username: data.username, isAuthenticated: true });
      setIsFetching(false);
      setError("");
    } catch (error) {
      console.error((error as Error).message);

      setError("There was an error logging in. Please try again.");
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  return { login, isFetching, error };
};

export default useLogin;
