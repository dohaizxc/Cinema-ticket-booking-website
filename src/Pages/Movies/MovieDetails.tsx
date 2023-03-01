import { Layout } from "../../components/Layout";
import React from "react";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Interface";
import { ListDays } from "../../components/ListDays";

export const MovieDetails = () => {
  const { fetchGet: fetchMovieDetails, result: movie } = useGet<Movie>();

  const param = useParams();
  const id = param.id;

  React.useEffect(() => {
    fetchMovieDetails("movie/" + id);
  }, []);

  return (
    <Layout>
      <LineWithText>Thông Tin Phim</LineWithText>
      <div className="grid grid-cols-3 px-24">
        <img className="p-2" src={movie?.image}></img>
        <div className="col-span-2 px-10">
          <div className="font-bold text-[32px] pb-5">{movie?.name}</div>
          <div className="pb-5">{movie?.description}</div>
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
            {movie?.releaseDate.substring(0, 10)}
          </div>
          <div>
            <span className="font-medium"> Ngôn ngữ: </span>
            {movie?.language}
          </div>
          <div>
            <span className="font-medium"> Rated: </span>
            {movie?.rated}
          </div>
          <button
            className="font-bold bg-sky-600 text-white px-3 py-1 rounded-lg m-2"
            onClick={() => {
              window.scroll({
                top: 500,
                left: 100,
                behavior: "smooth",
              });
            }}
          >
            Mua vé
          </button>
        </div>
      </div>

      <LineWithText>LỊCH CHIẾU PHIM</LineWithText>
      <ListDays></ListDays>
    </Layout>
  );
};
