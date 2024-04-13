import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="main-container">
      <h1>Login</h1>
      <form action="http://localhost:3000/auth" method="post">
        <label htmlFor="username">username:</label>
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          required
        />
        <br />
        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </section>
  );
}

export default App;
