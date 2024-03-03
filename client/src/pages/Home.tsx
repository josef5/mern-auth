import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth, setAuth } = useAuth();
  console.log("auth :", auth);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      // setIsFetching(true);

      try {
        const response = await fetch("/auth/status");
        const data = await response.json();
        // console.log("data :", data);

        // await sleep(2000);

        if (!response.ok) {
          throw new Error(data.message);
        }

        // setIsAuth(data.isAuthenticated);
        setAuth({
          username: data.username,
          isAuthenticated: data.isAuthenticated,
        });
        // setIsFetching(false);
        // setIsError(false);
      } catch (error) {
        console.error(error);

        // setIsError(true);
        // setIsAuth(false);
        setAuth({ username: "", isAuthenticated: false });
        // setIsFetching(false);
      }
    };

    fetchAuthStatus();
  }, [setAuth]);

  return (
    <div>
      <h2>Home</h2>
      <p>This is public content</p>
    </div>
  );
};

export default Home;
