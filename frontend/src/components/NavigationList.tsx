import React, { FC, useCallback, useContext } from "react";
import { AuthContext } from "@/utils/ThemeContext";
import { NavLink } from "react-router-dom";

export const NavigationList: FC = () => {
  const { authState } = useContext(AuthContext);
  const appLinks = useCallback(
    () =>
      [
        { key: 1, to: "/", children: authState ? "Home" : "Login" },
        !authState && { key: 2, to: "/register", children: "Register" },
      ]
        .filter(Boolean)
        .map((navLinkProps) => (
          <NavLink className={navLinkStyles} {...navLinkProps} />
        )),
    [authState],
  );

  return <nav className="flex">{appLinks()}</nav>;
};

function navLinkStyles({ isActive }) {
  const defaultStyles = "w-24 grid place-content-center border-b-2";
  const activeStyles = defaultStyles + " font-bold  border-blue-500";
  const inactiveStyles = defaultStyles + " font-thin";

  return isActive ? activeStyles : inactiveStyles;
}
