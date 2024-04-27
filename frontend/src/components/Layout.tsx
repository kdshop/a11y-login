import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationList, User } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { A11yAiInput } from "@components/a11y-ai-input/A11yAiInput";

export const Layout: FC = () => {
  return (
    <>
      <header className="fixed flex justify-between inset-0 w-screen h-10 bg-white shadow-lg z-10">
        <NavigationList />
        <User />
      </header>
      <section className="grid place-content-center h-full bg-gray-200">
        <A11yAiInput />
        <Outlet />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
    </>
  );
};
