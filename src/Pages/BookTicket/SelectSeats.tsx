import React from "react";
import { Space } from "antd";
import { seatMap } from "../../components/seats";
import { Seat } from "../../components/Seat";

export const SelectSeats = () => {
  const status = (seatId: number) => {
    // if (bookedSeats.includes(seatId)) return 2;
    // if (bookingSeats.includes(seatId)) return 1;
    return 0;
  };

  return (
    <div>
      <div>
        <div className="w-full">
          <img
            alt=""
            className="h-[100px] px-48"
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-screen.png"
          />
        </div>
        <Space direction="vertical" align="center" className="w-full my-15">
          <Space>
            {seatMap.firstRow.map((seat) => (
              <Seat
                key={seat.id}
                status={status(seat.id)}
                seat={seat}
                pickSeat={undefined}
              />
            ))}
          </Space>
          <Space direction="vertical">
            {seatMap.insideRows.map((insideRow, index) => (
              <Space key={index}>
                {insideRow?.map((seat) => (
                  <Seat
                    key={seat.id}
                    status={status(seat.id)}
                    seat={seat}
                    pickSeat={undefined}
                  />
                ))}
              </Space>
            ))}
          </Space>
          <Space>
            {seatMap.lastRow.map((seat) => (
              <Seat
                key={seat.id}
                status={status(seat.id)}
                seat={seat}
                pickSeat={undefined}
              />
            ))}
          </Space>
        </Space>
      </div>
    </div>
  );
};
