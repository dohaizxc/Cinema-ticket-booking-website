import React from "react";
import { Space } from "antd";
import { seatMap, seats } from "../../components/seats";
import { Seat } from "../../components/Seat";
import { LineWithText } from "../../components/LineWithText";
import { Food, Seat as SeatInterface } from "../../interface/Interface";
export const SelectSeats: React.FC<{
  setListSelectedSeats: React.Dispatch<React.SetStateAction<SeatInterface[]>>;
}> = ({ setListSelectedSeats }) => {
  const [selectedSeats, setSelectedSeats] = React.useState<SeatInterface[]>([]);

  const status = (seat: SeatInterface) => {
    if (selectedSeats.includes(seat)) return 1;
    return 0;
  };

  React.useEffect(() => {
    setListSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  // const pickSeat = (seatId: number) => {
  //   if (selectedSeats.includes(seatId)) {
  //     setSelectedSeats(selectedSeats.filter((seat) => seat !== Number(seatId)));
  //   } else setSelectedSeats([...selectedSeats, seatId]);
  // };

  const pickSeat = (seat: SeatInterface) => {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      selectedSeats.splice(index, 1);
      setSelectedSeats([...selectedSeats]);
    }
  };

  return (
    <div>
      <LineWithText>CHỌN GHẾ</LineWithText>

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
              seat={seat}
              status={status(seat)}
              pickSeat={pickSeat}
            />
          ))}
        </Space>
        <Space direction="vertical">
          {seatMap.insideRows.map((insideRow, index) => (
            <Space key={index}>
              {insideRow?.map((seat) => (
                <Seat
                  key={seat.id}
                  seat={seat}
                  status={status(seat)}
                  pickSeat={pickSeat}
                />
              ))}
            </Space>
          ))}
        </Space>
        <Space>
          {seatMap.lastRow.map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              status={status(seat)}
              pickSeat={pickSeat}
            />
          ))}
        </Space>
      </Space>
    </div>
  );
};
