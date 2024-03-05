import useAuth from "../hooks/useAuth";
import useAuthStatus from "../hooks/useAuthStatus";

const Home = () => {
  const { auth } = useAuth();
  const { useSetAuthStatus } = useAuthStatus();
  console.log("auth :", auth);

  useSetAuthStatus();

  return (
    <div>
      <h2>Home</h2>
      <p>This is public content</p>
    </div>
  );
};

export default Home;
