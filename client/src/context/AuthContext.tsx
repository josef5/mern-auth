import { createContext, useState } from "react";

interface AuthData {
  username: string;
  isAuthenticated?: boolean;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const initialAuthData: AuthData = {
  username: "",
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthData,
  setAuth: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>(initialAuthData);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
