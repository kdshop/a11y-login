import React, { FC, useState } from "react";
import { Input, Label, LoginButton } from "@/components";

export const Login: FC = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="relative shadow max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleFormSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" name="username" id="username" required />
        <Label htmlFor="password">Password:</Label>
        <Input type="password" name="password" id="password" />

        <LoginButton />
      </form>
    </div>
  );
};

function handleFormSubmit(e) {
  e.preventDefault();

  console.log(e.target[0].value, e.target[1].value);
}
