import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Interface";
import { Tab } from "@headlessui/react";

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
  const { fetchGet: fetchMovies, result: movieResults } = useGet<Movie[]>();

  React.useEffect(() => {
    fetchMovies("movie");
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center lg:mx-12 mx-5">
        <div className="my-8 lg:w-1/2 sm:w-3/5 w-4/5">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-full bg-sky-900/20 p-1">
              {type.map((type) => (
                <Tab
                  key={type.id}
                  onClick={() => setSelectedType(type.value)}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-full py-2.5 sm:text-base text-sm font-semibold leading-5 ",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow text-sky-700"
                        : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {type.title}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="flex flex-wrap justify-between gap-x-5 gap-y-5">
          {movieResults?.map((movie: Movie) => (
            <div
              key={movie._id}
              className="sm:w-[192px] w-[150px] h-[455px] relative"
            >
              {movie.rated.substring(0, 1) === "P" ? (
                <p className="absolute top-2 left-2 bg-green-500 rounded-full font-semibold text-white text-base py-2 px-[15px] z-30">
                  P
                </p>
              ) : (
                <p className="absolute top-2 left-2 bg-red-500 rounded-full font-semibold text-white text-base p-2 z-30">
                  {movie.rated.substring(0, 3)}
                </p>
              )}

              <img
                className="sm:w-[192px] sm:h-[276px] w-[150px] h-[200px] mx-auto cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 rounded"
                src={movie.image}
                alt={movie.name}
              ></img>
              <div
                className="line-clamp-2 cursor-pointer font-bold mt-3 hover:text-sky-500"
                onClick={() => {
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
                <span className="font-medium">Ngày khởi chiếu: </span>
                {movie.releaseDate.substring(0, 10)}
              </div>
              <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2">
                <button
                  className="font-semibold bg-sky-300 hover:bg-sky-700 text-black hover:text-white px-5 py-2 rounded"
                  onClick={() => {
                    navigate(`/movie/${movie._id}`);
                  }}
                >
                  Mua vé
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
