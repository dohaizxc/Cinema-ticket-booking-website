import React from "react";

export const Seat: React.FC<{ status: number; seat: any; pickSeat: any }> = ({
  status,
  seat,
  pickSeat,
}) => {
  return (
    <div
      className="m-[2px] h-[30px] border border-solid text-center cursor-pointer"
      style={{
        width: seat.type === "Couple" ? "92px" : "37px",
        //status: 0=> null, 1> picking,2>picked
        backgroundColor:
          status === 2
            ? "#B8C4BF"
            : status === 1
            ? "#fc6060"
            : seat.type === "Couple"
            ? "#f7adf2"
            : "#82bdf5",
        borderRadius: "10% 10% 100% 100% / 10% 10% 100% 100%",
      }}
      onClick={() => pickSeat(seat.id)}
    >
      {seat.code}
    </div>
  );
};
