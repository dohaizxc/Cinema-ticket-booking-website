import React, { useEffect, useRef } from "react";
import { seatMap } from "../../components/seats";
import { Seat } from "../../components/Seat";
import { Seat as SeatInterface } from "../../interface/Interface";
import { openNotification } from "../../components/Notifications";
export const SelectSeats: React.FC<{
  soldSeats: number[] | undefined;
  setListSelectedSeats: React.Dispatch<React.SetStateAction<SeatInterface[]>>;
}> = ({ soldSeats, setListSelectedSeats }) => {
  const [selectedSeats, setSelectedSeats] = React.useState<SeatInterface[]>([]);
  const myRef = useRef<HTMLDivElement>(null);

  const status = (seat: SeatInterface) => {
    if (soldSeats?.includes(seat.id)) return 2;
    else if (selectedSeats.includes(seat)) return 1;
    else return 0;
  };

  React.useEffect(() => {
    setListSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  const pickSeat = (seat: SeatInterface) => {
    if (soldSeats?.includes(seat.id)) return;

    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      if (selectedSeats.length > 8)
        openNotification("info", "Bạn có thể chọn tối đa 8 ghế!");
      else setSelectedSeats([...selectedSeats, seat]);
    } else {
      selectedSeats.splice(index, 1);
      setSelectedSeats([...selectedSeats]);
    }
  };

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollLeft += 155;
    }
  }, []);
  
  return (
    <div>
      <div className="overflow-x-scroll lg:overflow-x-hidden" ref={myRef}>
        <div className="w-[1024px] lg:w-full flex justify-center items-center mb-7">
          <p className="font-semibold text-center text-lg border bg-sky-200 rounded w-3/4">
            SCREEN
          </p>
        </div>
        <div className="w-[1024px] lg:w-full flex flex-col justify-center items-center lg:space-y-1">
          <div className="flex space-x-2 lg:space-x-3">
            {seatMap.firstRow.map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                status={status(seat)}
                pickSeat={pickSeat}
              />
            ))}
          </div>
          <div className="lg:space-y-1">
            {seatMap.insideRows.map((insideRow, index) => (
              <div key={index} className="flex space-x-2 lg:space-x-3">
                {insideRow?.map((seat) => (
                  <Seat
                    key={seat.id}
                    seat={seat}
                    status={status(seat)}
                    pickSeat={pickSeat}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex space-x-2 lg:space-x-3">
            {seatMap.lastRow.map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                status={status(seat)}
                pickSeat={pickSeat}
              />
            ))}
          </div>

          <div className="flex items-center font-medium space-x-2 lg:space-x-3 py-5">
            <div className="h-8 w-8 bg-[#82bdf5] rounded"></div>
            <p className="pr-5">Standard</p>

            <div className="h-8 w-8 bg-[#f7adf2] rounded"></div>
            <p className="pr-5">Sweetbox</p>

            <div className="h-8 w-8 bg-[#fc6060] rounded"></div>
            <p className="pr-5">Selected</p>

            <div className="h-8 w-8 bg-[#B8C4BF] rounded"></div>
            <p>Unavailable</p>
          </div>
        </div>
      </div>
    </div>
  );
};
