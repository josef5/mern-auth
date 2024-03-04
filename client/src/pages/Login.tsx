import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("aaaaaa");

  const { auth } = useAuth();
  const { login, isFetching, error } = useLogin();
  const location = useLocation();
  const intendedPath = location.state?.from?.pathname ?? "/";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    login(username, password);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    return <Navigate to={intendedPath} />;
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
