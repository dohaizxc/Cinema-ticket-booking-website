import React from "react";
import { Layout, Dropdown, MenuProps } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User } from "../interface/Interface";
import { openNotification } from "./Notifications";

export const Header11 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyMenu = location.pathname.split("/")[1];

  const [user, setUser] = React.useState<User>();

  const handleLogout = () => {
    localStorage.clear();
    openNotification("success", "Logout");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p
          onClick={handleProfile}
          className="flex justify-between font-medium text-[16px] text-center hover:text-cyan-600"
        >
          Thông tin người dùng
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={handleLogout}
          className="flex justify-between font-medium text-[16px] text-center hover:text-cyan-600"
        >
          Đăng xuất
        </p>
      ),
    },
  ];

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      setUser(userLocal);
    }
  }, []);

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
          {user ? (
            <Dropdown menu={{ items }} placement="bottomLeft">
              <p
                className={`flex justify-between font-bold text-[20px] text-center ${
                  keyMenu === "login" ? "text-cyan-300" : " text-white"
                } hover:text-cyan-300`}
              >
                {user.name}
              </p>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className={`flex justify-between font-bold text-[20px] text-center ${
                keyMenu === "login" ? "text-cyan-300" : " text-white"
              } hover:text-cyan-300`}
            >
              ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};
