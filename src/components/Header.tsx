import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User } from "../interface/Interface";
import { openNotification } from "./Notifications";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const products = [
  {
    name: "Phim Đang Chiếu",
    href: "http://127.0.0.1:5173/movie",
  },
  {
    name: "Phim Sắp Chiếu",
    href: "http://127.0.0.1:5173/movie",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyMenu = location.pathname.split("/")[1];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      setUser(userLocal);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    openNotification("success", "Logout");
    navigate("/login");
  };

  return (
    <header className="bg-sky-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 sm:px-8">
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
        <Popover.Group className="hidden sm:flex sm:gap-x-12">
          <Popover className="relative">
            <Popover.Button
              className={`flex items-center gap-x-1 text-sm font-semibold leading-6 ${
                keyMenu === "movie" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              PHIM
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-500" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-[150px] max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
                    >
                      <a href={item.href} className="font-semibold">
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            to="/cinema"
            className={`text-sm font-semibold leading-6 ${
              keyMenu === "cinema" ? "text-cyan-600" : ""
            } hover:text-cyan-500`}
          >
            RẠP
          </Link>
          <Link
            to="/error"
            className={`text-sm font-semibold leading-6 ${
              keyMenu === "error" ? "text-cyan-600" : ""
            } hover:text-cyan-500`}
          >
            ƯU ĐÃI
          </Link>
          {user ? (
            <Link
              to="/profile"
              className={`text-sm font-semibold leading-6 ${
                keyMenu === "profile" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              TÀI KHOẢN
            </Link>
          ) : (
            <></>
          )}
        </Popover.Group>
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
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">UIT CINEMA</span>
              <FontAwesomeIcon icon={faCcMastercard} className="text-3xl" />
            </a> */}
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
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        PHIM
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7  hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/cinema"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  RẠP
                </Link>
                <Link
                  to="/error"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  ƯU ĐÃI
                </Link>
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
