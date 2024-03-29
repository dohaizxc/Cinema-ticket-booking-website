import React, { useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { useParams, useNavigate } from "react-router-dom";
import {
  Movie,
  Province,
  Showtime,
  ShowtimeDetails,
  User,
} from "../../interface/Interface";
import { ListDays } from "../../components/ListDays";
import { Spin } from "antd";
import {
  ArrowDownCircleIcon,
  PlayCircleIcon,
  MapPinIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { openNotification } from "../../components/Notifications";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PopUpYoutube } from "../../components/PopUpYoutube";
export const MovieDetails = () => {
  const navigate = useNavigate();
  const {
    fetchGet: fetchMovieDetails,
    result: movie,
    isLoading: isLoadingMovie,
  } = useGet<Movie>();
  const { fetchGet: fetchProvinces, result: provincesResult } =
    useGet<Province[]>();
  const {
    fetchGet: fetchShowtimes,
    result: showtimesResult,
    isLoading,
  } = useGet<Showtime[]>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs("2022-12-11")
  );

  const nowDay = new Date("2022-12-20");
  nowDay.setHours(0, 0, 0, 0);

  const [showtimes, setShowtimes] = useState<Showtime[]>();
  const [selectedProvince, setSelectedProvince] = useState<Province>();

  const param = useParams();
  const id = param.id;

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      setUser(userLocal);
    }
  }, []);

  React.useEffect(() => {
    fetchMovieDetails("movie/" + id);
  }, [id]);

  const [type, setType] = useState<boolean>(false);

  React.useEffect(() => {
    if (movie) {
      setType(new Date(movie.releaseDate) <= nowDay);
    }
  }, [movie]);

  React.useEffect(() => {
    fetchProvinces("province");
  }, []);

  React.useEffect(() => {
    if (provincesResult) setSelectedProvince(provincesResult[0]);
  }, [provincesResult]);

  React.useEffect(() => {
    if (selectedProvince) {
      fetchShowtimes(
        "showtime/" +
          movie?._id +
          "/" +
          selectedProvince?._id +
          "/" +
          selectedDate?.format("YYYY-MM-DD")
      );
    }
  }, [selectedDate, selectedProvince]);

  React.useEffect(() => {
    let listShowtimes: Showtime[] = [];
    if (showtimesResult && showtimesResult.length > 0) {
      showtimesResult.map((showtime: Showtime) => {
        if (showtime.showtimes.length > 0) {
          listShowtimes.push(showtime);
        }
      });
    }
    if (listShowtimes) {
      setShowtimes(listShowtimes);
    }
  }, [showtimesResult]);

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
  };

  const handleShowtimeClick = (showtimeId: string) => {
    if (user) {
      scroll(0, 0);
      navigate(`/booking/${showtimeId}`);
    } else {
      localStorage.setItem("link", `/booking/${showtimeId}`);
      openNotification("info", "Vui lòng đăng nhập để tiếp tục");
      scroll(0, 0);
      navigate(`/login`);
    }
  };

  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
  const [isMovieDetails, setIsMovieDetails] = useState<boolean>(false);

  const formattedTime = (time: string): string => {
    const [hourString, minuteString] = time.split(":");
    const hour = parseInt(hourString);
    const minute = parseInt(minuteString);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {isLoadingMovie ? (
        <div className="flex justify-center min-h-screen py-10">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          {movie && (
            <div
              className={`hidden sm:block relative bg-cover ${
                type ? "min-h-[420px]" : "min-h-[95vh]"
              }`}
              style={{
                backgroundImage: `url(${movie.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center text-white lg:px-12 px-10">
                <img
                  className="w-[220px] h-[340px] rounded"
                  src={movie.image}
                ></img>
                <div className="pl-10 relative h-[340px] w-full">
                  <div
                    className={`${
                      isMovieDetails
                        ? "translate-y-0 text-3xl"
                        : "translate-y-32 text-4xl"
                    } transform absolute transition-all duration-500`}
                  >
                    <div className="flex items-center font-bold">
                      {movie.rated.substring(0, 1) === "P" ? (
                        <span className="text-xl mt-1 border border-green-500 rounded text-green-500 px-2">
                          P
                        </span>
                      ) : (
                        <span className="text-xl mt-1 border border-red-500 rounded text-red-500 px-1">
                          {movie.rated.substring(0, 3)}
                        </span>
                      )}
                      <p className="font-bold py-2 ml-2 -mr-2"> {movie.name}</p>
                    </div>

                    <div className="flex space-x-5 py-2 text-xl font-medium">
                      <p> {movie.genre.join(", ")}</p>
                      <p className="font-thin text-xl mx-5 mb-1">-</p>
                      <div className="flex items-center">
                        <ClockIcon className="mr-2 h-7 w-7 inline-block" />
                        <p>{movie.duration} phút</p>
                      </div>
                      <p className="font-thin text-xl mx-5 mb-1">-</p>
                      <div className="flex items-center">
                        <CalendarDaysIcon className="mr-2 h-7 w-7 inline-block" />
                        <p>
                          {new Date(movie.releaseDate).toLocaleDateString(
                            "en-UK"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      isMovieDetails
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1/4 opacity-0"
                    } transform absolute top-24 transition-all duration-500`}
                  >
                    <div>
                      <span className="font-medium">Đạo diễn: </span>
                      {movie.director}
                    </div>
                    <div>
                      <span className="font-medium">Diễn viên: </span>
                      {movie.actors}
                    </div>
                    <div>
                      <span className="font-medium"> Ngôn ngữ: </span>
                      {movie.language}
                    </div>
                    <div className="py-4">{movie?.description}</div>
                  </div>

                  <div className="absolute bottom-8 left-4 text-xl text-sky-500 font-semibold z-30">
                    <button
                      className={`${
                        isMovieDetails
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1/2 opacity-0"
                      } flex items-center transform absolute left-5 w-40 transition-all duration-500`}
                      onClick={() => setIsMovieDetails(!isMovieDetails)}
                    >
                      Ẩn thông tin
                      <MinusIcon className="h-5 w-5 ml-1" />
                    </button>
                    <button
                      className={`${
                        isMovieDetails
                          ? "translate-y-1/2 opacity-0"
                          : "translate-y-0 opacity-100"
                      } flex items-center transform absolute left-5 w-48 transition-all duration-500`}
                      onClick={() => setIsMovieDetails(!isMovieDetails)}
                    >
                      Thêm thông tin
                      <PlusIcon className="h-5 w-5 ml-1" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 w-full flex items-center justify-center">
                    <button
                      className=" hover:text-sky-500"
                      onClick={() => setIsShowPopUp(!isShowPopUp)}
                    >
                      <div className="flex items-center justify-center">
                        <PlayCircleIcon className="w-10 h-10" />
                        <p className="font-semibold text-base ml-2">
                          XEM TRAILER
                        </p>
                      </div>
                    </button>
                    {type && (
                      <>
                        <p className="font-thin text-xl mx-5 mb-1">|</p>
                        <button
                          className=" hover:text-sky-500"
                          onClick={() => {
                            window.scroll({
                              top: 450,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <ArrowDownCircleIcon className="w-10 h-10" />
                            <p className="font-semibold text-base ml-2">
                              MUA VÉ
                            </p>
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!movie ? (
        <div className="flex justify-center min-h-screen my-10">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div
          className={`block sm:hidden relative bg-cover ${
            type ? "min-h-[600px]" : "min-h-screen"
          }`}
          style={{
            backgroundImage: `url(${movie?.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col justify-center text-white px-8">
            <div className="text-base font-bold">
              {movie.rated.substring(0, 1) === "P" ? (
                <span className="mt-1 border border-green-500 rounded text-green-500 px-2">
                  P
                </span>
              ) : (
                <span className="mt-1 border border-red-500 rounded text-red-500 px-1">
                  {movie.rated.substring(0, 3)}
                </span>
              )}
              <span className="text-xl py-2 ml-1"> {movie.name}</span>
              <div className="flex space-x-5 font-medium my-2">
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 inline-block" />
                  <p>{movie.duration} phút</p>
                </div>
                <p className="font-thin text-xl mx-5 mb-1">-</p>
                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-5 w-5 inline-block" />
                  <p>
                    {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                className="w-[100px] h-[150px] rounded mt-2"
                src={movie?.image}
              ></img>
              <div className="pl-4">
                <p>
                  <span className="font-medium">Thể loại: </span>
                  {movie?.genre.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Đạo diễn: </span>
                  {movie?.director}
                </p>

                <p>
                  <span className="font-medium">Diễn viên: </span>
                  {movie?.actors}
                </p>
                <p>
                  <span className="font-medium"> Ngôn ngữ: </span>
                  {movie?.language}
                </p>
              </div>
            </div>
            <div className="py-2">{movie?.description}</div>

            <div className="flex items-center justify-center">
              <button
                className=" hover:text-sky-500"
                onClick={() => setIsShowPopUp(!isShowPopUp)}
              >
                <div className="flex items-center justify-center">
                  <PlayCircleIcon className="w-10 h-10" />
                  <p className="font-semibold text-base ml-2">XEM TRAILER</p>
                </div>
              </button>
              {type && (
                <>
                  <p className="font-thin text-xl mx-5 mb-1">|</p>
                  <button
                    className=" hover:text-sky-500"
                    onClick={() => {
                      window.scroll({
                        top: 600,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <ArrowDownCircleIcon className="w-10 h-10" />

                      <p className="font-semibold text-base ml-2">MUA VÉ</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {type && (
        <div className="sm:mx-12 mx-2">
          <LineWithText>TỈNH THÀNH</LineWithText>
          <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5  justify-center sm:py-2">
            {provincesResult?.map((province: Province) => (
              <div
                key={province._id}
                onClick={() => handleProvinceClick(province)}
                className={`text-base lg:text-lg  px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded
            ${
              selectedProvince?._id === province._id
                ? "bg-sky-500 dark:bg-sky-700"
                : "bg-white dark:bg-slate-800"
            }`}
              >
                <div className="font-bold">{province.name}</div>
              </div>
            ))}
          </div>
          <LineWithText>CHỌN NGÀY</LineWithText>
          <ListDays selectDay={setSelectedDate}></ListDays>

          <LineWithText>LỊCH CHIẾU PHIM</LineWithText>

          {isLoading ? (
            <div className="flex justify-center items-center my-6">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <div>
              {showtimes && showtimes.length > 0 ? (
                <div className="lg:mx-10">
                  {showtimes?.map((showtime: Showtime) => (
                    <div key={showtime.cinema._id}>
                      <div className="flex sm:flex-row flex-col sm:items-center sm:pl-10 pl-5">
                        <div className="sm:text-xl text-base font-bold sm:py-4 pb-4 sm:w-2/5 w-full flex items-center">
                          <button
                            onClick={() => {
                              window.open(
                                showtime.cinema.address_url,
                                "_blank"
                              );
                            }}
                          >
                            <MapPinIcon className="sm:w-10 sm:h-10 h-6 w-6 sm:mr-2 mr-1" />
                          </button>
                          {showtime.cinema.name}
                        </div>

                        <div className="font-medium sm:text-lg sm:w-3/5 w-full">
                          <div className="flex flex-wrap sm:gap-x-6 gap-x-3 gap-y-4">
                            {showtime.showtimes?.map(
                              (showtimeDetails: ShowtimeDetails) => (
                                <button
                                  key={showtimeDetails._id}
                                  className="lg:w-20 lg:py-[6px] sm:w-16 w-12 px-1 bg-white border-sky-700 border-2 hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded"
                                  onClick={() =>
                                    handleShowtimeClick(showtimeDetails._id)
                                  }
                                >
                                  {formattedTime(showtimeDetails.time)}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border border-gray-400 my-5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-semibold text-center text-xl my-10">
                  KHÔNG CÓ SUẤT CHIẾU PHÙ HỢP
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {movie && isShowPopUp && (
        <PopUpYoutube
          link={movie.trailer_url}
          setIsShowPopUp={setIsShowPopUp}
        ></PopUpYoutube>
      )}
    </>
  );
};
