import { createContext, Dispatch, useState } from "react";
export type User = { name: string; surname: string } | null;
const AuthContext = createContext<{
  authState: User;
  setAuthState: Dispatch<User>;
}>({ authState: null, setAuthState: null });

const AuthThemeContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState<User>({
    name: "Konrad",
    surname: "Albrecht",
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthThemeContextProvider };
