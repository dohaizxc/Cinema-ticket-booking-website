import React from "react";
import dayjs from "dayjs";

export const ListDays = () => {
  const startDate = dayjs();
  const listDates: any[] = [];

  for (let i = 0; i < 10; i++) {
    listDates.push(startDate.add(i, "day"));
  }

  const [selectedDate, setSelectedDate] = React.useState<any>(listDates[0]);

  const handleDate = (date: any) => {
    setSelectedDate(date);
  }

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3 py-3 justify-center">
      {listDates.map((date) => (
        <div
          onClick={() => handleDate(date)}
          className={`grid grid-cols-2 text-[12px] lg:text-[16px] border-sky-700 border-[2px] p-1 lg:p-2 cursor-pointer hover:bg-sky-500
        ${selectedDate === date ? "bg-sky-500" : ""}`
      }
        >
          <div className="self-center">{date.format("MM")}</div>
          <div className="text-[32px] text-center font-bold row-span-2 self-center">
            {date.format("DD")}
          </div>
          <div className="self-center">{date.format("ddd")}</div>
        </div>
      ))}
    </div>
  );
};
