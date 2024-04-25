import React, { FC, useContext } from "react";
import { AuthContext } from "@/utils/ThemeContext";

export const Hero: FC = () => {
  const { authState } = useContext(AuthContext);

  return (
    <article
      className="grid place-content-center w-screen h-screen"
      style={{
        backgroundImage:
          "radial-gradient( circle 100vw at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )",
      }}
    >
      <h1 className="text-7xl">Welcome {authState?.name}!</h1>
    </article>
  );
};
