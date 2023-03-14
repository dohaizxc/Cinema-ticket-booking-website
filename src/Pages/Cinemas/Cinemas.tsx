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
} from "../../interface/Interface";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";

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
    dayjs("2022-12-10")
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const provinceParams = searchParams.get("province");
  const cinemaParams = searchParams.get("cinema");

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
    navigate("/cinema?province=" + province.name);
  };

  const handleCinemaClick = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setHidden(false);
    navigate(
      "/cinema?province=" + selectedProvince?.name + "&cinema=" + cinema.name
    );
  };

  const handleLocationClick = (linkUrl: URL) => {
    window.open(linkUrl, "_blank");
  };

  return (
    <Layout>
      <LineWithText>DANH SÁCH RẠP</LineWithText>

      <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-5 justify-center py-5">
        {provincesResult?.map((province: Province) => (
          <div
            key={province._id}
            onClick={() => handleProvinceClick(province)}
            className={`text-base lg:text-lg px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 rounded
            ${provinceParams === province.name ? "bg-sky-500" : ""}`}
          >
            <div className="font-bold">{province.name}</div>
          </div>
        ))}
      </div>

      <div className="p-[24px] grid sm:grid-cols-4 grid-cols-2 gap-5 lg:gap-10 px-[30px] lg:px-[100px] text-black text-center">
        {cinemasResult?.map((cinema: Cinema) => (
          <div key={cinema._id}>
            <div
              onClick={() => handleCinemaClick(cinema)}
              className={`font-bold text-[10px] lg:text-base px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500 rounded-t 
          ${cinemaParams === cinema.name ? "bg-sky-500" : ""}`}
            >
              {cinema.name}
            </div>
            <p className="sm:block hidden border-sky-700 border-x-[2px] border-b-[2px] p-2">
              {cinema.address}
            </p>
            <button
              className=" border-sky-700 border-x-[2px] border-b-[2px] p-2 w-full hover:bg-sky-500 rounded-b flex justify-center"
              onClick={() => handleLocationClick(cinema.address_url)}
            >
              <MapPinIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>

      {!hidden && (
        <>
          <LineWithText>LỊCH CHIẾU PHIM</LineWithText>
          <ListDays selectDay={setSelectedDate}></ListDays>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <>
              {showtimes && showtimes.length > 0 ? (
                <div>
                  {showtimes?.map((showtime: Showtime) => (
                    <div className="flex lg:px-32 p-5">
                      <img
                        src={showtime.movie.image}
                        alt={showtime.movie.name}
                        className="rounded lg:h-[300px] lg:w-[200px] h-[150px] w-[100px]"
                      ></img>
                      <div className="lg:px-10 pl-5">
                        <div className="font-bold sm:text-xl text-base pb-2">
                          {showtime.movie.name}
                        </div>
                        <div className="font-medium sm:text-lg text-base">
                          <div className="flex flex-wrap sm:gap-x-6 gap-x-3 gap-y-4">
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-bold text-center text-[24px] mt-5">
                  KHÔNG CÓ SUẤT CHIẾU PHÙ HỢP
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* <div>{showtimes && <pre>{JSON.stringify(showtimes, null, 2)}</pre>}</div> */}
    </Layout>
  );
};
