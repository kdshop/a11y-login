import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationList, User } from "@/components";

export const Layout: FC = () => {
  return (
    <>
      <header className="fixed flex justify-between inset-0 w-screen h-10 bg-white shadow-lg z-10">
        <NavigationList />
        <User />
      </header>
      <section className="grid place-content-center h-full bg-gray-200">
        <Outlet />
      </section>
    </>
  );
};
