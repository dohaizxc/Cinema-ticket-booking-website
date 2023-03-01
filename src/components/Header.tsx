import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyMenu = location.pathname.split("/")[1];
  return (
    <Layout.Header style={{ backgroundColor: "#0c468a" }}>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-[600px] h-full">
          <Link
            to="/"
            className="flex justify-between font-bold text-[30px] text-center text-[#FFD700]
            hover:text-cyan-300"
          >
            UIT CINEMA
          </Link>

          <Link
            to="/movie"
            className={`flex justify-between font-bold text-[20px] text-center ${
              keyMenu === "movie" ? "text-cyan-300" : " text-white"
            } hover:text-cyan-300`}
          >
            PHIM
          </Link>

          <Link
            to="/cinema"
            className={`flex justify-between font-bold text-[20px] text-center ${
              keyMenu === "cinema" ? "text-cyan-300" : " text-white"
            } hover:text-cyan-300`}
          >
            RẠP
          </Link>
        </div>
      </div>
    </Layout.Header>
  );
};
