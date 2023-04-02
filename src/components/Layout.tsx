import React from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <AntLayout className="font-montserrat">
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </AntLayout>
    </>
  );
};
