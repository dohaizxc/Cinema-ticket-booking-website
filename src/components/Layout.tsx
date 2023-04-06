import React, { useContext } from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <AntLayout className="font-montserrat text-black dark:text-white">
        <div className="dark:bg-galaxy h-screen w-full fixed"></div>
        <div className="fixed w-full z-30">
          <Header />
        </div>
        <div className="mt-12 z-10">
          <Outlet />
        </div>

        <Footer />
      </AntLayout>
    </>
  );
};
