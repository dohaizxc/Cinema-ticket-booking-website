import { Layout } from "../../components/Layout";
import React, { useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { useParams, useNavigate } from "react-router-dom";
import {
  Cinema,
  Movie,
  Province,
  Showtime,
  ShowtimeDetails,
} from "../../interface/Interface";
import { ListDays } from "../../components/ListDays";
import { Spin } from "antd";
import dayjs from "dayjs";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { fetchGet: fetchMovieDetails, result: movie } = useGet<Movie>();
  const { fetchGet: fetchProvinces, result: provincesResult } =
    useGet<Province[]>();
  const { fetchGet: fetchCinemas, result: cinemasResult } = useGet<Cinema[]>();
  const {
    fetchGet: fetchShowtimes,
    result: showtimesResult,
    isLoading,
  } = useGet<Showtime[]>();
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(
    dayjs("2022-12-10")
  );

  const [showtimes, setShowtimes] = useState<Showtime[]>();
  const [selectedProvince, setSelectedProvince] = useState<
    Province | undefined
  >(undefined);

  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(
    undefined
  );

  const param = useParams();
  const id = param.id;

  React.useEffect(() => {
    fetchMovieDetails("movie/" + id);
  }, []);

  React.useEffect(() => {
    fetchProvinces("province");
  }, []);

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

  console.log(showtimesResult);

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
    setSelectedCinema(undefined);
    fetchCinemas("province/" + province._id);
  };

  const handleCinemaClick = (cinema: Cinema) => {
    setSelectedCinema(cinema);
  };

  return (
    <Layout>
      <LineWithText>TH??NG TIN PHIM</LineWithText>
      <div className="grid grid-cols-3 px-24">
        <img className="m-2 rounded" src={movie?.image}></img>
        <div className="col-span-2 px-10">
          <div className="font-bold text-[32px] pb-5">{movie?.name}</div>
          <div className="pb-5">{movie?.description}</div>
          <div>
            <span className="font-medium">?????o di???n: </span>
            {movie?.director}
          </div>

          <div>
            <span className="font-medium">Di???n vi??n: </span>
            {movie?.actors}
          </div>
          <div>
            <span className="font-medium">Th??? lo???i: </span>
            {movie?.genre.join(", ")}
          </div>
          <div>
            <span className="font-medium"> Th???i l?????ng: </span>
            {movie?.duration} ph??t
          </div>
          <div>
            <span className="font-medium">Ng??y kh???i chi???u: </span>
            {movie?.releaseDate.substring(0, 10)}
          </div>
          <div>
            <span className="font-medium"> Ng??n ng???: </span>
            {movie?.language}
          </div>
          <div>
            <span className="font-medium"> Rated: </span>
            {movie?.rated}
          </div>
          <button
            className="font-bold bg-sky-600 text-white px-4 py-2 rounded-lg m-2"
            onClick={() => {
              window.open(movie?.trailer_url, "_blank");
            }}
          >
            Xem trailer
          </button>

          <button
            className="font-bold bg-sky-600 text-white px-4 py-2 rounded-lg m-2"
            onClick={() => {
              window.scroll({
                top: 500,
                left: 100,
                behavior: "smooth",
              });
            }}
          >
            Mua v??
          </button>
        </div>
      </div>

      <LineWithText>L???CH CHI???U PHIM</LineWithText>
      <div className="flex flex-wrap gap-x-10 gap-y-5 justify-center py-5">
        {provincesResult?.map((province: Province) => (
          <div
            key={province._id}
            onClick={() => handleProvinceClick(province)}
            className={`text-[16px] lg:text-[20px]  px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 rounded
            ${selectedProvince?._id === province._id ? "bg-sky-500" : ""}`}
          >
            <div className="font-bold">{province.name}</div>
          </div>
        ))}
      </div>
      <LineWithText>L???CH CHI???U PHIM</LineWithText>
      <ListDays selectDay={setSelectedDate}></ListDays>

      <LineWithText>L???CH CHI???U PHIM</LineWithText>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div>
          {showtimes && showtimes.length > 0 ? (
            <div>
              {showtimes?.map((showtime: Showtime) => (
                <div className=" py-5 px-10">
                  <div className="font-bold text-[24px] pb-2">
                    {showtime.cinema.name}
                  </div>
                  <div className="font-medium text-[20px]">
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                      {showtime.showtimes?.map(
                        (showtimeDetails: ShowtimeDetails) => (
                          <div
                            className="p-2 border-sky-700 border-2 cursor-pointer hover:bg-sky-500 rounded"
                            onClick={() =>
                              navigate(`/booking/${showtimeDetails._id}`)
                            }
                          >
                            {showtimeDetails.time}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-bold text-center text-[24px] mt-5">
              KH??NG C?? SU???T CHI???U PH?? H???P
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
