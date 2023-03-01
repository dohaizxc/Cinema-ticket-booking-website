import React from "react";
import { SelectSeats } from "./SelectSeats";
import { Layout } from "../../components/Layout";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { Showtime } from "../../interface/Interface";
import { useParams } from "react-router-dom";
import ticket_img from "../../assets/ticket_bg.png";
export const Booking = () => {
  const { fetchGet: fetchShowtime, result: showtimeResult } =
    useGet<Showtime>();
  const param = useParams();
  const id = param.id;
  React.useEffect(() => {
    fetchShowtime("showtime/" + id);
  }, []);

  return (
    <Layout>
      <LineWithText>BOOKING ONLINE</LineWithText>
      <div className="font-bold px-32">
        {showtimeResult?.cinema.name} | Phòng{" "}
        {showtimeResult?.showtime.roomId.name} | Số ghế (240/240)
      </div>
      <div className="font-bold px-32">
        {showtimeResult?.showtime.date.substring(0, 10)}{" "}
        {showtimeResult?.showtime.time} - {showtimeResult?.showtime.time_end}
      </div>
      <LineWithText>CHỌN GHẾ</LineWithText>
      <SelectSeats></SelectSeats>

      <div
        className="bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ticket_img})`,
        }}
      >
        <div className="grid grid-cols-3 py-[70px] px-[150px]">
          <img
            src={showtimeResult?.showtime.movieId.image}
            className="w-[200px]"
          ></img>
        </div>
      </div>
    </Layout>
  );
};
