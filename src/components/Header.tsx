import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User } from "../interface/Interface";
import { openNotification } from "./Notifications";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Modal } from "./Modal/Modal";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyMenu = location.pathname.split("/")[1];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = React.useState<User>();
  // const [openModal, setOpenModal] = useState<boolean>(false);
  // const [confirm, setConfirm] = useState<boolean>(false);

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      setUser(userLocal);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    openNotification("success", "Đăng xuất thành công");
    scroll(0, 0);
    navigate("/login");
  };

  // const handleLogout = () => {
  //   setOpenModal(true);
  // };

  // React.useEffect(() => {
  //   if (confirm) {
  //     localStorage.clear();
  //     openNotification("success", "Đăng xuất thành công");
  //     scroll(0, 0);
  //     navigate("/login");
  //   }
  // }, [confirm]);

  return (
    <header className="bg-sky-100">
      {/* <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setConfirm={setConfirm}
        title="Bạn có muốn đăng xuất?"
      ></Modal> */}
      <nav className="flex w-full items-center justify-between p-3 sm:px-4 lg:px-10">
        <div className="flex sm:flex-1">
          <Link
            to="/"
            className="flex justify-between font-bold text-xl text-center text-sky-700
            hover:text-cyan-500"
          >
            UIT CINEMA
          </Link>
        </div>
        <div className="flex sm:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden sm:flex sm:gap-x-12">
          <Link
            to="/movie"
            className={`text-sm font-semibold leading-6 ${
              keyMenu === "movie" ? "text-cyan-600" : ""
            } hover:text-cyan-500`}
          >
            PHIM
          </Link>
          <Link
            to="/cinema"
            className={`text-sm font-semibold leading-6 ${
              keyMenu === "cinema" ? "text-cyan-600" : ""
            } hover:text-cyan-500`}
          >
            RẠP
          </Link>
          <Link
            to="/newsoffer"
            className={`text-sm font-semibold leading-6 ${
              keyMenu === "newsoffer" ? "text-cyan-600" : ""
            } hover:text-cyan-500`}
          >
            ƯU ĐÃI
          </Link>
          {user && (
            <Link
              to="/profile?tab=userinfo"
              className={`text-sm font-semibold leading-6 ${
                keyMenu === "profile" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              TÀI KHOẢN
            </Link>
          )}
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className={`text-sm font-semibold leading-6 ${
                keyMenu === "login" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              Đăng xuất <span>&rarr;</span>
            </button>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-semibold leading-6 ${
                keyMenu === "login" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              Đăng nhập <span>&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="sm:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex justify-between font-bold text-lg text-center text-sky-700
            hover:text-cyan-500"
            >
              UIT CINEMA
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/movie"
                  className=" -mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  PHIM
                </Link>
                <Link
                  to="/cinema"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  RẠP
                </Link>
                <Link
                  to="/newsoffer"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  ƯU ĐÃI
                </Link>
                {user && (
                  <Link
                    to="/profile?tab=userinfo"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    TÀI KHOẢN
                  </Link>
                )}
              </div>
              <div className="py-6">
                {user ? (
                  <p
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    Đăng xuất
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
