import { Layout } from "../../components/Layout";
import React, { useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { useParams, useNavigate } from "react-router-dom";
import {
  Movie,
  Province,
  Showtime,
  ShowtimeDetails,
} from "../../interface/Interface";
import { ListDays } from "../../components/ListDays";
import { Spin } from "antd";
import {
  ArrowDownCircleIcon,
  PlayCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { fetchGet: fetchMovieDetails, result: movie } = useGet<Movie>();
  const { fetchGet: fetchProvinces, result: provincesResult } =
    useGet<Province[]>();
  const {
    fetchGet: fetchShowtimes,
    result: showtimesResult,
    isLoading,
  } = useGet<Showtime[]>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs("2022-12-10")
  );

  const nowDay = new Date("2022-12-20");
  nowDay.setHours(0, 0, 0, 0);

  const [showtimes, setShowtimes] = useState<Showtime[]>();
  const [selectedProvince, setSelectedProvince] = useState<Province>();

  const param = useParams();
  const id = param.id;

  React.useEffect(() => {
    fetchMovieDetails("movie/" + id);
  }, []);

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
    setSelectedProvince(province);
  };

  return (
    <Layout>
      <div
        className={`hidden sm:block relative bg-cover ${
          type ? "min-h-[400px]" : "min-h-screen"
        }`}
        style={{
          backgroundImage: `url(${movie?.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white lg:px-24 px-10">
          <img
            className="lg:w-[220px] lg:h-[320px] sm:w-[200px] sm:h-[300px] w-[150px] h-[215px] rounded"
            src={movie?.image}
          ></img>
          <div className="pl-10">
            <div className="font-bold text-xl py-2">{movie?.name}</div>
            <div>
              <span className="font-medium">Đạo diễn: </span>
              {movie?.director}
            </div>

            <div>
              <span className="font-medium">Diễn viên: </span>
              {movie?.actors}
            </div>
            <div>
              <span className="font-medium">Thể loại: </span>
              {movie?.genre.join(", ")}
            </div>
            <div>
              <span className="font-medium"> Thời lượng: </span>
              {movie?.duration} phút
            </div>
            <div>
              <span className="font-medium">Ngày khởi chiếu: </span>
              {movie && (
                <>{new Date(movie.releaseDate).toLocaleDateString("en-UK")}</>
              )}
            </div>
            <div>
              <span className="font-medium"> Ngôn ngữ: </span>
              {movie?.language}
            </div>
            <div>
              <span className="font-medium"> Rated: </span>
              {movie?.rated}
            </div>
            <div className="py-2">{movie?.description}</div>

            <div className="flex items-center justify-center">
              <button
                className=" hover:text-sky-500"
                onClick={() => {
                  window.open(movie?.trailer_url, "_blank");
                }}
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
                        top: 500,
                        left: 100,
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
      </div>

      <div
        className={`block sm:hidden relative bg-cover mx-[-20px] lg:mx-[-50px] ${
          type ? "min-h-[550px]" : "min-h-screen"
        }`}
        style={{
          backgroundImage: `url(${movie?.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-filter backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[100px] h-[150px] rounded"
              src={movie?.image}
            ></img>
            <div className="pl-4">
              <div className="font-bold text-base py-2">{movie?.name}</div>
              <div>
                <span className="font-medium">Đạo diễn: </span>
                {movie?.director}
              </div>

              <div>
                <span className="font-medium">Diễn viên: </span>
                {movie?.actors}
              </div>
              <div>
                <span className="font-medium">Thể loại: </span>
                {movie?.genre.join(", ")}
              </div>
              <div>
                <span className="font-medium"> Thời lượng: </span>
                {movie?.duration} phút
              </div>
              <div>
                <span className="font-medium">Ngày khởi chiếu: </span>
                {movie && (
                  <>{new Date(movie.releaseDate).toLocaleDateString("en-UK")}</>
                )}
              </div>
              <div>
                <span className="font-medium"> Ngôn ngữ: </span>
                {movie?.language}
              </div>
              <div>
                <span className="font-medium"> Rated: </span>
                {movie?.rated}
              </div>
            </div>
          </div>
          <div className="py-2">{movie?.description}</div>

          <div className="flex items-center justify-center">
            <button
              className=" hover:text-sky-500"
              onClick={() => {
                window.open(movie?.trailer_url, "_blank");
              }}
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
                      top: 500,
                      left: 100,
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

      {type && (
        <div className="sm:mx-12 mx-2">
          <LineWithText>TỈNH THÀNH</LineWithText>
          <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5  justify-center py-5">
            {provincesResult?.map((province: Province) => (
              <div
                key={province._id}
                onClick={() => handleProvinceClick(province)}
                className={`text-base lg:text-lg  px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 rounded
            ${selectedProvince?._id === province._id ? "bg-sky-500" : ""}`}
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
                <div className="lg:mx-10 m-5">
                  {showtimes?.map((showtime: Showtime) => (
                    <div>
                      <div className="flex sm:flex-row flex-col sm:items-center sm:py-5 mx-10">
                        <div className="sm:text-xl text-base font-bold py-4 sm:w-2/5 w-full flex items-center">
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

                        <div className="font-medium sm:text-lg text-base sm:px-10 px-5">
                          <div className="flex flex-wrap sm:gap-x-6 gap-x-3 gap-y-4">
                            {showtime.showtimes?.map(
                              (showtimeDetails: ShowtimeDetails) => (
                                <button
                                  className="w-16 p-2 border-sky-700 border-2 hover:bg-sky-500 rounded"
                                  onClick={() =>
                                    navigate(`/booking/${showtimeDetails._id}`)
                                  }
                                >
                                  {showtimeDetails.time}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border border-gray-400 sm:my-0 my-5" />
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
    </Layout>
  );
};
