import { createContext, useEffect, useState } from "react";

interface AuthData {
  username: string;
  // password: string;
  // accessToken: string;
  isAuthenticated?: boolean;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  useSetAuthStatus: () => void;
  fetchAuthStatus: () => Promise<void>;
  isFetching: boolean;
  error: string;
}

const initialAuthData: AuthData = {
  username: "",
  // password: "",
  // accessToken: "",
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthData,
  setAuth: () => {},
  useSetAuthStatus: () => {},
  fetchAuthStatus: async () => {},
  isFetching: false,
  error: "",
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>(initialAuthData);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const fetchAuthStatus = async () => {
    setIsFetching(true);

    try {
      const response = await fetch("/auth/status");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAuth({
        username: data.username,
        isAuthenticated: data.isAuthenticated,
      });
    } catch (error) {
      console.error(error);

      setError((error as Error).message);
      setAuth({ username: "", isAuthenticated: false });
    } finally {
      setIsFetching(false);
    }
  };

  const useSetAuthStatus = () => {
    useEffect(() => {
      fetchAuthStatus();
    }, []);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        useSetAuthStatus,
        fetchAuthStatus,
        isFetching,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
