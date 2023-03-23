import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Interface";
import { Tab } from "@headlessui/react";
import { Spin } from "antd";
import { Tabs } from "../../components/Tabs";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const type = [
  {
    id: 1,
    title: "PHIM ĐANG CHIẾU",
    value: true,
  },
  {
    id: 2,
    title: "PHIM SẮP CHIẾU",
    value: false,
  },
];

export const Movies = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<boolean>(true);
  const {
    fetchGet: fetchMovies,
    result: movieResults,
    isLoading,
  } = useGet<Movie[]>();
  const [movies, setMovies] = useState<Movie[]>();

  const nowDay = new Date("2022-12-20");
  nowDay.setHours(0, 0, 0, 0);

  const nowShowing = movieResults?.filter((movie: Movie) => {
    return new Date(movie.releaseDate) <= nowDay;
  }, []);

  const comingSoon = movieResults?.filter((movie: Movie) => {
    return new Date(movie.releaseDate) > nowDay;
  }, []);

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  useEffect(() => {
    setMovies(
      movieResults?.filter((movie: Movie) => {
        return new Date(movie.releaseDate) <= nowDay;
      }, [])
    );
  }, [movieResults]);

  useEffect(() => {
    if (selectedType === true) setMovies(nowShowing);
    else setMovies(comingSoon);
  }, [selectedType]);

  return (
    <Layout>
      <Tabs
        setSelectedTab={setSelectedType}
        tab1="PHIM ĐANG CHIẾU"
        tab2="PHIM SẮP CHIẾU"
      ></Tabs>
      <div className="flex flex-col items-center justify-center lg:mx-12 sm:mx-5 mx-0 mb-5">
        {isLoading ? (
          <div className="flex justify-center min-h-screen">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-5">
            {movies?.map((movie: Movie) => (
              <div
                key={movie._id}
                className="sm:w-[192px] w-[170px] sm:h-[455px] h-[420px] relative"
              >
                {movie.rated.substring(0, 1) === "P" ? (
                  <p className="absolute top-2 left-2 bg-green-500 rounded-full font-semibold text-white py-1 px-[11px] z-10">
                    P
                  </p>
                ) : (
                  <p className="absolute top-2 left-2 bg-red-500 rounded-full font-semibold text-white p-1 z-10">
                    {movie.rated.substring(0, 3)}
                  </p>
                )}

                <img
                  className="sm:w-[192px] sm:h-[276px] w-[170px] h-[240px] mx-auto cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 rounded"
                  src={movie.image}
                  alt={movie.name}
                  onClick={() => {
                    scroll(0, 0);
                    navigate(`/movie/${movie._id}`);
                  }}
                ></img>
                <div
                  className="line-clamp-2 cursor-pointer font-bold mt-3 hover:text-sky-500"
                  onClick={() => {
                    scroll(0, 0);
                    navigate(`/movie/${movie._id}`);
                  }}
                >
                  {movie.name}
                </div>
                <div>
                  <span className="font-medium">Thể loại: </span>
                  {movie.genre.join(", ")}
                </div>
                <div>
                  <span className="font-medium">Thời lượng: </span>
                  {movie.duration} phút
                </div>
                <div>
                  <span className="font-medium">Khởi chiếu: </span>
                  {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <button
                    className="px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/movie/${movie._id}`);
                    }}
                  >
                    {selectedType ? <>Mua vé</> : <>Chi tiết</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
