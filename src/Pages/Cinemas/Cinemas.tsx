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
  Movie,
  ShowtimeDetails,
} from "../../interface/Interface";

import { useNavigate } from "react-router-dom";

export const Cinemas = () => {
  // const [provinceId, setProvinceId] = React.useState(
  //   "638f61dceae6921efd78e7b4"
  // );
  const navigate = useNavigate();

  const { fetchGet: fetchProvinces, result: provincesResult } =
    useGet<Province[]>();
  const { fetchGet: fetchCinemas, result: cinemasResult } = useGet<Cinema[]>();
  const { fetchGet: fetchShowtimes, result: showtimesResult } =
    useGet<Showtime[]>();
  const [hidden, setHidden] = useState<boolean>(true);
  const [showtimes, setShowtimes] = useState<Showtime[]>();
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

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
    fetchCinemas("province/" + province._id);
  };

  const handleCinemaClick = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setHidden(false);
    if (selectedCinema?._id)
      fetchShowtimes("showtime/cinema/" + selectedCinema?._id + "/2022-12-11");
  };

  const handleLocationClick = (linkUrl: URL) => {
    window.open(linkUrl, "_blank");
  };

  return (
    <Layout>
      <LineWithText>DANH SÁCH RẠP</LineWithText>

      <div className="flex flex-wrap gap-x-10 gap-y-5 justify-center py-5">
        {provincesResult?.map((province: Province) => (
          <div
            key={province._id}
            onClick={() => handleProvinceClick(province)}
            className={`text-[16px] lg:text-[20px]  px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500
            ${selectedProvince?._id === province._id ? "bg-sky-500" : ""}`}
          >
            <div className="font-bold">{province.name}</div>
          </div>
        ))}
      </div>

      <div className="p-[24px] grid grid-cols-4 gap-5 lg:gap-10 px-[30px] lg:px-[100px] text-black text-center">
        {cinemasResult?.map((cinema: Cinema) => (
          <div key={cinema._id}>
            <div
              onClick={() => handleCinemaClick(cinema)}
              className={`font-bold text-[10px] lg:text-[16px] px-2 lg:px-5 py-2 border-sky-700 border-[2px] cursor-pointer hover:bg-sky-500
          ${selectedCinema?._id === cinema._id ? "bg-sky-500" : ""}`}
            >
              {cinema.name}
            </div>
            <div className=" border-sky-700 border-x-[2px] p-2">
              {cinema.address}
            </div>
            <p
              className=" border-sky-700 border-[2px] p-2  cursor-pointer hover:bg-sky-500"
              onClick={() => handleLocationClick(cinema.address_url)}
            >
              <i className="fa-solid fa-location-dot"></i>
            </p>
          </div>
        ))}
      </div>

      {!hidden && (
        <>
          <LineWithText>LỊCH CHIẾU PHIM</LineWithText>
          <ListDays></ListDays>
          {showtimes?.map((showtime: Showtime) => (
            <div className="grid grid-cols-7 px-32">
              <img
                src={showtime.movie.image}
                alt={showtime.movie.name}
                className="py-5 h-[300px] w-[200px]"
              ></img>
              <div className="col-span-6 py-5 px-10">
                <div className="font-bold text-[24px] pb-2">
                  {showtime.movie.name}
                </div>
                <div className="font-medium text-[20px]">
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {showtime.showtimes?.map(
                      (showtimeDetails: ShowtimeDetails) => (
                        <div
                          className="p-2 border-sky-700 border-2 cursor-pointer hover:bg-sky-500"
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
        </>
      )}

      {/* <div>
        {selectedCinema && <pre>{JSON.stringify(selectedCinema, null, 2)}</pre>}
      </div> */}
    </Layout>
  );
};
