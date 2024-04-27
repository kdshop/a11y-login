import React, { FC, useContext, useState } from "react";
import { Input, Label, LoginButton } from "@/components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/utils/ThemeContext";
import { toast } from "react-toastify";

export const Register: FC = () => {
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    setLoading(true);

    fetch("http://localhost:3000/register", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((user) => {
            setAuthState(user);
            navigate("/");
            toast.success("Account created!");
          });
        } else {
          return response.text().then((msg) => {
            toast.error(msg);
            setLoading(false);
          });
        }
      })

      .catch((err) => {
        console.log(err);
        toast.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="relative shadow max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
      {loading ? (
        <h2>🌀 Loading...</h2>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <form onSubmit={handleFormSubmit}>
            <Label htmlFor="username">Username:</Label>
            <Input type="text" name="username" id="username" required />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" name="password" id="password" />

            <LoginButton text="Register" />
          </form>
        </>
      )}
    </div>
  );
};
