import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("test");

  const { auth } = useAuth();
  const { register, isFetching, error } = useRegister();
  const location = useLocation();
  const intendedPath = location.state?.from?.pathname ?? "/";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    register(username, password);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    return <Navigate to={intendedPath} />;
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2>Register</h2>

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
      <button disabled={isFetching}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
