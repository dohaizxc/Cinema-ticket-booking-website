import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Movie, User } from "../interface/Interface";
import { openNotification } from "./Notifications";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { DarkMode } from "./DarkMode";
import { useGet } from "../api/get";
import "../App.css";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyMenu = location.pathname.split("/")[1];
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const object = localStorage.getItem("user");
  const { fetchGet: fetchMovies, result: movieResults } = useGet<Movie[]>();
  const [search, setSearch] = useState<string>("");
  const [searchMovies, setSearchMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (movieResults) {
      if (search.length > 0) {
        const movies: Movie[] = movieResults.filter((movie: Movie) =>
          movie.name.toLowerCase().includes(search.toLowerCase())
        );
        if (movies) setSearchMovies(movies);
      } else setSearchMovies(undefined);
    }
  }, [search]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearch("");
  }, [location]);

  const handleLogout = () => {
    // localStorage.clear();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    openNotification("success", "Đăng xuất thành công");
    scroll(0, 0);
    navigate("/login");
  };

  const handleMovie = (id: string) => {
    scroll(0, 0);
    setIsSearchOpen(false);
    setSearch("");
    navigate(`/movie/${id}`);
  };

  return (
    <header className="bg-sky-100 dark:bg-black">
      <nav className="flex w-full items-center justify-between p-3 sm:px-4 lg:px-10 font-montserrat relative">
        <div className="flex sm:flex-1">
          <Link
            to="/"
            className="flex justify-between font-bold text-xl sm:text-lg text-center text-sky-700 dark:text-cyan-400
            hover:text-cyan-500 dark:hover:text-cyan-500"
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
            <Bars3Icon className="h-6 w-6 dark:text-white" />
          </button>
        </div>
        <div className="hidden sm:flex sm:gap-x-12  font-semibold text-base dark:text-white">
          <Link
            to="/movie"
            className={`leading-6 ${
              keyMenu === "movie" ? "text-cyan-600 dark:text-cyan-300" : ""
            } hover:text-cyan-500`}
          >
            Phim
          </Link>
          <Link
            to="/cinema"
            className={` leading-6 ${
              keyMenu === "cinema" ? "text-cyan-600 dark:text-cyan-300" : ""
            } hover:text-cyan-500`}
          >
            Rạp
          </Link>
          <Link
            to="/newsoffer"
            className={` leading-6 ${
              keyMenu === "newsoffer" ? "text-cyan-600 dark:text-cyan-300" : ""
            } hover:text-cyan-500`}
          >
            Ưu đãi
          </Link>
          {object ? (
            <Link
              to="/profile?tab=userinfo"
              className={` leading-6 ${
                keyMenu === "profile" ? "text-cyan-600 dark:text-cyan-300" : ""
              } hover:text-cyan-500`}
            >
              Tài khoản
            </Link>
          ) : (
            <Link
              to="/login"
              className={` leading-6 ${
                keyMenu === "login" ? "text-cyan-600" : ""
              } hover:text-cyan-500`}
            >
              Đăng nhập
            </Link>
          )}
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:justify-end font-medium text-base">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-10 flex space-x-5 z-20">
            <div className="relative text-gray-900">
              <div
                className={`absolute top-9 left-0 rounded-lg bg-white dark:bg-sky-100 max-h-[400px] scroll lg:w-60 md:w-40 w-20
                space-y-2
                ${isSearchOpen ? "" : "hidden"}
                ${
                  !searchMovies || searchMovies.length === 0
                    ? "p-0"
                    : "p-2 border border-sky-300"
                }
                `}
              >
                {searchMovies?.map((movie: Movie) => (
                  <div
                    key={movie._id}
                    className="flex items-center h-16 space-x-2 cursor-pointer hover:bg-sky-100 hover:text-sky-500"
                    onClick={() => handleMovie(movie._id)}
                  >
                    <img className="h-16 w-12" src={movie.image}></img>
                    <p className="w-40 font-bold text-xs hover:text-sky-500 col-span-3">
                      {movie.name}
                    </p>
                  </div>
                ))}
              </div>
              <input
                className={`bg-white dark:bg-sky-100 h-8 rounded-full text-sm focus:outline-none transition-all duration-500
                ${
                  isSearchOpen ? "w-60 pr-3 pl-10 border border-sky-300" : "w-0"
                }
                `}
                type="search"
                name="search"
                placeholder="Tìm kiếm phim"
                value={search}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-1/2 left-3 transform -translate-y-1/2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <MagnifyingGlassIcon
                  className={`text-gray-600 transition-all duration-500 transform ${
                    isSearchOpen
                      ? "h-5 w-5"
                      : "h-6 w-6 dark:text-white -translate-x-8"
                  }`}
                />
              </button>
            </div>
            <DarkMode />
          </div>
        </div>
      </nav>

      <div className="sm:hidden absolute top-[10px] transform right-12 flex space-x-4 z-20">
        <div className="relative text-gray-900">
          <div
            className={`absolute top-9 left-0 rounded-lg bg-white dark:bg-sky-100 max-h-[400px] scroll w-48
                space-y-2
                ${isSearchOpen ? "" : "hidden"}
                ${!searchMovies || searchMovies.length === 0 ? "p-0" : "p-2"}
                `}
          >
            {searchMovies?.map((movie: Movie) => (
              <div
                key={movie._id}
                className="flex items-center space-x-2 pl-1 cursor-pointer hover:bg-sky-100 hover:text-sky-500"
                onClick={() => handleMovie(movie._id)}
              >
                <img src={movie.image} className="h-12 w-8" />
                <p className="font-bold text-xs hover:text-sky-500">
                  {movie.name}
                </p>
              </div>
            ))}
          </div>
          <input
            className={`bg-white dark:bg-sky-100 h-8 rounded-full text-sm focus:outline-none transition-all duration-500
                ${
                  isSearchOpen ? "w-48 pr-3 pl-10 border border-sky-300" : "w-0"
                }
                `}
            type="search"
            name="search"
            placeholder="Tìm kiếm phim"
            value={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <MagnifyingGlassIcon
              className={`text-gray-600 transition-all duration-500 transform ${
                isSearchOpen
                  ? "h-5 w-5"
                  : "h-6 w-6 dark:text-white -translate-x-8"
              }`}
            />
          </button>
        </div>
        <DarkMode />
      </div>

      <Dialog
        as="div"
        className="sm:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-20" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full font-montserrat overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                {object && (
                  <Link
                    to="/profile?tab=userinfo"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    TÀI KHOẢN
                  </Link>
                )}
              </div>
              <div className="py-6">
                {object ? (
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
