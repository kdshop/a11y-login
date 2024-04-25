import React, { FC } from "react";

export const LoginButton: FC = ({ text = "Log in" }) => (
  <button
    className="relative group/btn block w-full h-10 border rounded-lg mt-6"
    type="submit"
  >
    {text}
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </button>
);
