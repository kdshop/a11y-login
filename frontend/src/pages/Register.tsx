import React, { FC } from "react";
import { Input, Label, LoginButton } from "@/components";

export const Register: FC = () => (
  <div className="relative shadow max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
    <h1 className="text-3xl font-bold mb-4">Register</h1>
    <form action="http://localhost:3000/auth" method="post">
      <Label htmlFor="username">Username:</Label>
      <Input type="text" name="username" id="username" required />
      <Label htmlFor="password">Password:</Label>
      <Input type="password" name="password" id="password" />

      <LoginButton text="Register" />
    </form>
  </div>
);
