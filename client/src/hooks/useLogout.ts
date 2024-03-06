import { useState } from "react";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const logout = async (/* username: string, password: string */) => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        /* headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), */
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      /* setAuth({ username: data.username, isAuthenticated: true });
      setIsFetching(false); */
      setError("");
    } catch (error) {
      console.error((error as Error).message);

      setError("There was an error logging out");
    } finally {
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  return { logout, isFetching, error };
};

export default useLogout;
