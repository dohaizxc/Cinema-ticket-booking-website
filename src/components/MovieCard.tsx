import React, { useState } from "react";
import { Movie } from "../interface/Interface";
import { useNavigate } from "react-router-dom";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export const MovieCard: React.FC<{ movie: Movie; type: boolean }> = ({
  movie,
  type,
}) => {
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState<boolean>(false);
  return (
    <div className="h-[375px] flex flex-col items-center">
      <div className="relative">
        <img
          src={movie.image}
          onMouseEnter={() => setMovieInfo(true)}
          onMouseLeave={() => setMovieInfo(false)}
          className="h-[300px] w-full rounded cursor-pointer relative"
        />
        {movieInfo && (
          <div
            className="absolute bottom-0 w-full"
            onMouseEnter={() => setMovieInfo(true)}
            onMouseLeave={() => setMovieInfo(false)}
          >
            <div className="bg-gray-800 bg-opacity-80 rounded-b-lg px-5 py-2 text-white">
              <div className="space-y-1">
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-6 w-6 inline-block" />
                  <p>{movie.duration} phút</p>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-6 w-6 inline-block" />
                  <p>
                    {new Date(movie.releaseDate).toLocaleDateString("en-UK")}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
                    onClick={() => {
                      navigate(`/movie/${movie._id}`);
                    }}
                  >
                    {type ? <>Mua vé</> : <>Chi tiết</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="line-clamp-2 cursor-pointer font-bold text-center my-2 hover:text-sky-500"
        onClick={() => {
          navigate(`/movie/${movie._id}`);
        }}
      >
        <span className="border border-red-500 rounded text-red-500 px-1 mr-1">
          {movie.rated.substring(0, 1) === "P"
            ? movie.rated.substring(0, 1)
            : movie.rated.substring(0, 3)}
        </span>
        {movie.name}
      </div>
    </div>
  );
};
