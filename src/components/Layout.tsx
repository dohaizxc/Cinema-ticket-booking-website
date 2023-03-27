import React from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <>
      <AntLayout>
        <Header></Header>
        <div className="font-montserrat">{props.children}</div>
        <Footer></Footer>
      </AntLayout>
    </>
  );
};
