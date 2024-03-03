import { useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("aaaaaa");

  const [isFetching, setIsFetching] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState("");
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      console.log("data :", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      // setIsAuth(true);
      setAuth({ username: data.username, isAuthenticated: true });
      setIsFetching(false);
      setError("");
    } catch (error) {
      console.error(error);

      setError("There was an error logging in. Please try again.");
      // setIsAuth(false);
      setAuth({ username: "", isAuthenticated: false });
      setIsFetching(false);
    }
  };

  console.log({ isFetching, auth, error });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label>Username:</label>
      <input
        type="email"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <button disabled={isFetching}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
