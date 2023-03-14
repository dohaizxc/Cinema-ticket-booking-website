import React, { useState } from "react";
import { Movie } from "../interface/Interface";
import { useNavigate } from "react-router-dom";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
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
                  <p> {movie.releaseDate.substring(0, 10)}</p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className=" font-semibold bg-sky-300 hover:bg-sky-700 text-black hover:text-white px-5 py-2 mt-2 rounded"
                    onClick={() => {
                      navigate(`/movie/${movie._id}`);
                    }}
                  >
                    Mua vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="line-clamp-2 font-bold text-center my-2 hover:text-sky-500"
        onClick={() => {
          navigate(`/movie/${movie._id}`);
        }}
      >
        {movie.name}
      </button>
    </div>
  );
};
