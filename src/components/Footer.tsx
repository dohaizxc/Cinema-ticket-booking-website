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
      className="text-base text-center font-montserrat"
      style={{ backgroundColor: "#0c468a", color: "white" }}
    >
      <div className="lg:mx-20 mx-0 flex md:flex-row flex-col justify-between md:space-y-0 space-y-5">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg mb-2">ĐIỀU KHOẢN SỬ DỤNG</h3>
          <button>Điều Khoản Chung</button>
          <button>Điều Khoản Giao Dịch</button>
          <button>Chính Sách Thanh Toán</button>
          <button>Chính Sách Bảo Mật</button>
          <button>Câu Hỏi Thường Gặp</button>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="flex space-x-5 justify-center">
            <FacebookOutlined className="text-[40px] m-2 cursor-pointer" />
            <YoutubeOutlined className="text-[40px] m-2 cursor-pointer" />
            <InstagramOutlined className="text-[40px] m-2 cursor-pointer" />
            <TwitterOutlined className="text-[40px] m-2 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">CHĂM SÓC KHÁCH HÀNG</h3>
          <p>Hotline: 2023 2023</p>
          <p>Giờ làm việc: 8:00 - 22:00</p>
          <p>Email hỗ trợ: dohaizxc@uitcinema.vn</p>
        </div>
      </div>

      <div className="text-center mt-5">
        <h3 className="text-white">CÔNG TY TNHH DOHAIZXC VIETNAM</h3>
        <p>
          COPYRIGHT 2023 DOHAIZXC.{" "}
          <span className="sm:inline-block block"> All RIGHTS RESERVED.</span>
        </p>
      </div>
    </Layout.Footer>
  );
};
