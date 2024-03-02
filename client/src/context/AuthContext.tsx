import { createContext, useState } from "react";

interface AuthContextType {
  auth?: {
    username: string;
    password: string;
    accessToken: string;
    // isLoggedIn?: boolean;
  };
  setAuth?: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      accessToken: string;
      // isLoggedIn?: boolean;
    }>
  >;
}

const AuthContext = createContext<AuthContextType>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
    accessToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
