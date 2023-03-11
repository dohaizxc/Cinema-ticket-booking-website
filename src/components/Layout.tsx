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
        <div className="sm:px-[20px] lg:px-[50px] p-0">{props.children}</div>
        <Footer></Footer>
      </AntLayout>
    </>
  );
};
