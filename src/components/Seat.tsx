import React from "react";
import { Seat as SeatInterface } from "../interface/Interface";
import { seats } from "./seats";

export const Seat: React.FC<{
  seat: SeatInterface;
  status: number;
  pickSeat: any;
}> = ({ seat, status, pickSeat }) => {
  // const [seat_, setSeat_] = React.useState<SeatInterface>(seat);

  // const handleClick = () => {
  //   if (seat_.status === 0) {
  //     const newSeat: SeatInterface = JSON.parse(JSON.stringify(seat_));
  //     newSeat.status = 1;
  //     setSeat_(newSeat);
  //   } else if (seat_.status === 1) {
  //     {
  //       const newSeat: SeatInterface = JSON.parse(JSON.stringify(seat_));
  //       newSeat.status = 0;
  //       setSeat_(newSeat);
  //     }
  //   }
  // };
  return (
    <div
      className={`m-[2px] h-[30px] border border-solid text-center cursor-pointer
      ${seat.type === "Couple" ? "w-[92px]" : "w-[37px]"}
      ${
        status === 2
          ? "bg-[#B8C4BF]"
          : status === 1
          ? "bg-[#fc6060]"
          : seat.type === "Couple"
          ? "bg-[#f7adf2]"
          : "bg-[#82bdf5]"
      }
      `}
      style={{
        //status: 0=> null, 1> picking,2>picked
        borderRadius: "10% 10% 100% 100% / 10% 10% 100% 100%",
      }}
      onClick={() => pickSeat(seat)}
    >
      {seat.code}
    </div>
  );
};
