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
      <div className="flex items-center justify-center">
        <div className="my-10 sm:w-1/2 w-3/5">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-full bg-sky-900/20 p-1">
              {type.map((type) => (
                <Tab
                  key={type.id}
                  onClick={() => setSelectedType(type.value)}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-full py-2.5 sm:text-base text-sm font-semibold leading-5",
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
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-10 py-10 px-[50px]">
        {movieResults?.map((movie: Movie) => (
          <div key={movie._id} className="w-[192px]">
            <img
              className="w-[192px] h-[276px] mx-auto cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300"
              src={movie.image}
              alt={movie.name}
            ></img>
            <div className="font-bold">{movie.name}</div>
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
            <div className="text-center py-2 pb-[40px]">
              <button
                className="font-bold bg-sky-600 text-white px-3 py-1 rounded-lg"
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
    </Layout>
  );
};
