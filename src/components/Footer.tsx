import React from "react";
import { Layout } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const Footer = () => {
  return (
    <Layout.Footer
      className="text-[16px] text-center"
      style={{ backgroundColor: "#0c468a", color: "white" }}
    >
      <div className="text-center">
        <FacebookOutlined className="text-[40px] m-2" />
        <YoutubeOutlined className="text-[40px] m-2" />
        <InstagramOutlined className="text-[40px] m-2" />
        <TwitterOutlined className="text-[40px] m-2" />
      </div>

      <p>CÔNG TY TNHH UIT CINEMA VIETNAM</p>
      <p>COPYRIGHT 2022 UIT CINEMA. All RIGHTS RESERVED.</p>
    </Layout.Footer>
  );
};
