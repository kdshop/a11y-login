import React, { FC, useContext } from "react";
import { AuthContext } from "@/utils/ThemeContext";
import { IconUser } from "@tabler/icons-react";

export const User: FC = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <div className="grid grid-flow-col mr-2 place-content-center place-items-center font-light">
      {authState && (
        <>
          <IconUser size="28" className="mr-2 p-1 border rounded-full" />
          <button onClick={() => setAuthState(null)}>Logout</button>
        </>
      )}
    </div>
  );
};
