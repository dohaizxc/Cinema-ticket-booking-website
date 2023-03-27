import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { UserOutlined } from "@ant-design/icons";
import { User } from "../../interface/Interface";
import Barcode from "react-barcode";
import { UserInfo } from "./UserInfo";
import { useGet } from "../../api/get";
import { ChangePassword } from "./ChangePassword";
import { BookingHistory } from "./BookingHistory";
import { Membership } from "./Membership";
import { useLocation, useNavigate } from "react-router-dom";
import { openNotification } from "../../components/Notifications";
import { Modal } from "../../components/Modal/Modal";

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");

  const { fetchGet: fetchUser, result: user } = useGet<User>();

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      fetchUser("user/" + userLocal._id);
    }
  }, []);

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (!object) {
      scroll(0, 0);
      navigate(`/`);
    }
  }, []);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleLogout = () => {
    setOpenModal(true);
  };

  React.useEffect(() => {
    if (confirm) {
      localStorage.clear();
      openNotification("success", "Đăng xuất thành công");
      scroll(0, 0);
      navigate("/login");
    }
  }, [confirm]);

  return (
    <Layout>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setConfirm={setConfirm}
        title="Bạn có muốn đăng xuất?"
      ></Modal>
      <div className="flex sm:flex-row flex-col sm:space-x-10 space-x-0 sm:space-y-0 space-y-5 lg:px-20 px-5 my-5">
        <div className="sm:w-1/3 w-full bg-white rounded drop-shadow-md sm:sticky sm:h-screen sm:top-0">
          <div className="rounded bg-gradient-to-r from-sky-300 to-indigo-300 pb-4">
            <div className="bg-[url('https://order.thecoffeehouse.com/_nuxt/img/Leaves.5c9ad83.svg')] bg-cover bg-no-repeat">
              <div className="flex justify-between mx-4">
                <p className="font-bold text-[20px] pt-3">{user?.name}</p>
                <p className="border mb-4 rounded-br-lg rounded-bl-lg px-3">
                  Tích điểm
                </p>
              </div>
              <div className="flex flex-col justify-center bg-white rounded mx-4 mt-3">
                <div className="m-2 flex justify-center items-center">
                  <Barcode
                    value="1234567890"
                    format="CODE128"
                    width={3}
                    height={70}
                    displayValue={false}
                  />
                </div>
                <p className="font-medium text-base text-center pb-2">
                  {user?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-between">
              <span>BẠC</span>
              <span>VÀNG</span>
              <span>KIM CƯƠNG</span>
            </div>

            <div className="mx-4 my-2 rounded bg-gradient-to-r from-sky-300 to-indigo-300">
              <div className="dot-beign"></div>
              <UserOutlined className="site-form-item-icon" />
              <div className="dot-end"></div>
            </div>
            <p className="flex flex-row ml-[10px] mr-[10px] text-base my-[20px] justify-between">
              <span>Tổng chi tiêu</span>
              <span className="font-bold">0 đ</span>
            </p>
          </div>
          <div className="flex flex-col pb-10">
            <button
              className={`font-medium border-b border-sky-300 text-base hover:text-sky-500 p-2 ${
                tab === "userinfo"
                  ? "bg-sky-600 text-white rounded hover:text-white"
                  : "bg-sky-100"
              }`}
              onClick={() => {
                navigate(`/profile?tab=userinfo`);
              }}
            >
              Thông tin tài khoản
            </button>
            <button
              className={`font-medium border-b border-sky-300 text-base p-2 hover:text-sky-500 ${
                tab === "changepassword"
                  ? "bg-sky-600 text-white rounded hover:text-white"
                  : "bg-sky-100"
              }`}
              onClick={() => {
                navigate(`/profile?tab=changepassword`);
              }}
            >
              Đổi mật khẩu
            </button>
            <button
              className={`font-medium border-b border-sky-300 text-base p-2 hover:text-sky-500 ${
                tab === "bookinghistory"
                  ? "bg-sky-600 text-white rounded hover:text-white"
                  : "bg-sky-100"
              }`}
              onClick={() => {
                navigate(`/profile?tab=bookinghistory`);
              }}
            >
              Lịch sử đặt vé
            </button>
            <button
              className={`font-medium border-b border-sky-300 text-base p-2 hover:text-sky-500 ${
                tab === "membership"
                  ? "bg-sky-600 text-white rounded hover:text-white"
                  : "bg-sky-100"
              }`}
              onClick={() => {
                navigate(`/profile?tab=membership`);
              }}
            >
              Chính sách thành viên
            </button>
            <button
              className="font-medium text-base bg-sky-100 p-2 hover:text-sky-500"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="sm:w-2/3 w-full">
          {tab === "userinfo" && user && (
            <UserInfo fetchGet={fetchUser} user={user}></UserInfo>
          )}
          {tab === "changepassword" && user && (
            <ChangePassword></ChangePassword>
          )}
          {tab === "bookinghistory" && user && (
            <BookingHistory userId={user?._id}></BookingHistory>
          )}
          {tab === "membership" && user && <Membership></Membership>}
        </div>
      </div>
    </Layout>
  );
};
