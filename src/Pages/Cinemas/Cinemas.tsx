import React from "react";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { ListDays } from "../../components/ListDays";
import {
  Province,
  Cinema,
  Showtime,
  ShowtimeDetails,
  User,
} from "../../interface/Interface";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { openNotification } from "../../components/Notifications";

export const Cinemas = () => {
  const navigate = useNavigate();
  const { fetchGet: fetchProvinces, result: provincesResult } =
    useGet<Province[]>();
  const { fetchGet: fetchCinemas, result: cinemasResult } = useGet<Cinema[]>();
  const {
    fetchGet: fetchShowtimes,
    result: showtimesResult,
    isLoading,
  } = useGet<Showtime[]>();
  const [hidden, setHidden] = useState<boolean>(true);
  const [showtimes, setShowtimes] = useState<Showtime[]>();
  const [selectedProvince, setSelectedProvince] = useState<
    Province | undefined
  >(undefined);

  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(
    undefined
  );

  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(
    dayjs("2022-12-11")
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const provinceParams = searchParams.get("province");
  const cinemaParams = searchParams.get("cinema");

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const object = localStorage.getItem("user");
    if (object) {
      const userLocal: User = JSON.parse(object);
      setUser(userLocal);
    }
  }, []);

  React.useEffect(() => {
    if (selectedCinema) {
      fetchShowtimes(
        "showtime/cinema/" +
          selectedCinema._id +
          "/" +
          selectedDate?.format("YYYY-MM-DD")
      );
    }
  }, [selectedDate, selectedCinema]);

  React.useEffect(() => {
    fetchProvinces("province");
  }, []);

  React.useEffect(() => {
    if (provinceParams && cinemaParams) {
      fetchShowtimes("showtime/cinema/" + cinemaParams + "/" + "2022-12-11");
      setHidden(false);
    }
    if (provinceParams) {
      fetchCinemas("province/" + provinceParams);
    }
  }, [provinceParams, cinemaParams]);

  React.useEffect(() => {
    let listShowtimes: Showtime[] = [];
    showtimesResult?.map((showtime: Showtime) => {
      if (showtime.showtimes.length > 0) {
        listShowtimes.push(showtime);
      }
    });
    if (listShowtimes) {
      setShowtimes(listShowtimes);
    }
  }, [showtimesResult]);

  const handleProvinceClick = (province: Province) => {
    if (province._id !== selectedProvince?._id) {
      setHidden(true);
    }
    setSelectedProvince(province);
    setSelectedCinema(undefined);
    fetchCinemas("province/" + province._id);
    navigate("/cinema?province=" + province._id);
  };

  const handleCinemaClick = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setHidden(false);
    if (provinceParams)
      navigate("/cinema?province=" + provinceParams + "&cinema=" + cinema._id);
    else
      navigate(
        "/cinema?province=" + selectedProvince?._id + "&cinema=" + cinema._id
      );
  };

  const handleLocationClick = (linkUrl: URL) => {
    window.open(linkUrl, "_blank");
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
      <div className="sm:mx-12 mx-2 min-h-screen">
        <LineWithText>DANH SÁCH RẠP</LineWithText>

        {provincesResult && (
          <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5 justify-center sm:py-5">
            {provincesResult.map((province: Province) => (
              <div
                key={province._id}
                onClick={() => handleProvinceClick(province)}
                className={`text-base lg:text-lg px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded
      ${
        provinceParams === province._id
          ? "bg-sky-500 dark:bg-sky-700"
          : "bg-white dark:bg-slate-800"
      }`}
              >
                <div className="font-bold">{province.name}</div>
              </div>
            ))}
          </div>
        )}

        <div className="lg:p-6 pt-5 grid sm:grid-cols-4 grid-cols-2 gap-5 lg:gap-10 px-2 lg:px-12 text-center">
          {cinemasResult &&
            cinemasResult.map((cinema: Cinema) => (
              <div key={cinema._id}>
                <button
                  onClick={() => handleCinemaClick(cinema)}
                  className={`font-bold lg:text-base w-full h-16 border-sky-700 border-[2px] hover:bg-sky-500 dark:hover:bg-sky-700 dark:border-slate-900 rounded-t 
                  ${
                    cinemaParams === cinema._id
                      ? "bg-sky-500 dark:bg-sky-700"
                      : "bg-white dark:bg-slate-800"
                  }`}
                >
                  {cinema.name}
                </button>
                <p className="sm:block hidden xl:h-20 lg:h-24 md:h-auto bg-white border-sky-700 dark:bg-slate-800 dark:border-slate-900 border-x-[2px] border-b-[2px] px-2 py-2">
                  {cinema.address}
                </p>
                <button
                  className=" border-sky-700 border-x-[2px] border-b-[2px] bg-white p-2 w-full hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded-b flex justify-center"
                  onClick={() => handleLocationClick(cinema.address_url)}
                >
                  <MapPinIcon className="sm:h-6 sm:w-6 h-4 w-4" />
                </button>
              </div>
            ))}
        </div>

        {!hidden && (
          <>
            <LineWithText>LỊCH CHIẾU PHIM</LineWithText>
            <ListDays selectDay={setSelectedDate}></ListDays>

            {isLoading ? (
              <div className="flex justify-center items-center my-6">
                <Spin size="large" tip="Loading..." />
              </div>
            ) : (
              <>
                {showtimes && showtimes.length > 0 ? (
                  <div>
                    {showtimes?.map((showtime: Showtime) => (
                      <div
                        key={showtime.movie._id}
                        className="lg:mx-16 my-5 mx-2"
                      >
                        <div className="flex">
                          <img
                            src={showtime.movie.image}
                            alt={showtime.movie.name}
                            className="rounded lg:h-[280px] lg:w-[190px] h-[150px] w-[100px]"
                          ></img>
                          <div className="lg:pl-12 pl-6">
                            <div
                              className="font-bold sm:text-xl mb-4 cursor-pointer hover:text-sky-500"
                              onClick={() => {
                                scroll(0, 0);
                                navigate(`/movie/${showtime.movie._id}`);
                              }}
                            >
                              {showtime.movie.rated.substring(0, 1) === "P" ? (
                                <span className="border border-green-500 rounded text-green-500 px-1 mx-1">
                                  {showtime.movie.rated.substring(0, 1)}
                                </span>
                              ) : (
                                <span className="border border-red-500 rounded text-red-500 px-1 mx-1">
                                  {showtime.movie.rated.substring(0, 3)}
                                </span>
                              )}

                              {showtime.movie.name}
                            </div>
                            <div className="font-medium sm:text-lg">
                              <div className="flex flex-wrap sm:gap-x-6 sm:gap-y-5 gap-x-3 gap-y-3">
                                {showtime.showtimes?.map(
                                  (showtimeDetails: ShowtimeDetails) => (
                                    <button
                                      key={showtimeDetails._id}
                                      className="lg:w-20 lg:py-[6px] sm:w-16 w-12 p-1 bg-white border-sky-700 border-2 hover:bg-sky-500 dark:hover:bg-sky-700 dark:bg-slate-800 dark:border-slate-900 rounded"
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
              </>
            )}
          </>
        )}
      </div>

      {/* <div>{showtimes && <pre>{JSON.stringify(showtimes, null, 2)}</pre>}</div> */}
    </>
  );
};
