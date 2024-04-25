import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Hero } from "@/components";
import { Login, Register } from "@/pages";
import { AuthContext, AuthThemeContextProvider } from "@/utils/ThemeContext";

function App() {
  return (
    <AuthThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <AuthContext.Consumer>
                  {({ authState }) => (authState ? <Hero /> : <Login />)}
                </AuthContext.Consumer>
              }
            />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthThemeContextProvider>
  );
}

export default App;
