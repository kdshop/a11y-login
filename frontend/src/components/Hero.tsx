import React, { FC, useContext } from "react";
import { AuthContext } from "@/utils/ThemeContext";

export const Hero: FC = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState);
  return (
    <article className="grid place-content-center w-screen h-screen">
      <h1 className="text-7xl">Welcome {authState?.username}!</h1>
    </article>
  );
};
