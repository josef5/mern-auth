import useAuth from "../hooks/useAuth";

const Home = () => {
  const { useSetAuthStatus } = useAuth();

  useSetAuthStatus();

  return (
    <div>
      <h2>Home</h2>
      <p>This is public content</p>
    </div>
  );
};

export default Home;
