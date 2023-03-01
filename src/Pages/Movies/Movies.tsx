import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Interface";

export const Movies = () => {
  const [selectedType, setSelectedType] = useState<boolean | undefined>(true);

  const handleTypeClick = (type: boolean) => {
    setSelectedType(type);
  };

  const { fetchGet: fetchMovies, result: movieResults } = useGet<Movie[]>();

  React.useEffect(() => {
    fetchMovies("movie");
  }, []);

  const navigate = useNavigate();

  return (
    <Layout>
      Movie
      <div className="flex justify-center gap-x-10 text-[20px] font-bold">
        <div
          className={`border-sky-700 border-[2px] px-10 py-2 rounded-3xl hover:bg-sky-500
        ${selectedType === true ? "bg-sky-500" : ""}`}
          onClick={() => handleTypeClick(true)}
        >
          PHIM ĐANG CHIẾU
        </div>
        <div
          className={`border-sky-700 border-[2px] px-10 py-2 rounded-3xl hover:bg-sky-500
        ${selectedType === false ? "bg-sky-500" : ""}`}
          onClick={() => handleTypeClick(false)}
        >
          PHIM SẮP CHIẾU
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-10 py-10 px-[50px]">
        {movieResults?.map((movie: Movie) => (
          <div className="w-[192px]">
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
              <span className="font-medium"> Thời lượng: </span>
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
