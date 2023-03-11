import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const ListDays: React.FC<{
  selectDay: React.Dispatch<dayjs.Dayjs>;
}> = ({ selectDay }) => {
  const listDates: dayjs.Dayjs[] = [];
  const swiperRef = useRef<SwiperType>();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const startDate = dayjs("2022-12-10");
  for (let i = 0; i < 14; i++) {
    listDates.push(startDate.add(i, "day"));
  }

  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(
    listDates[0]
  );

  const handleDate = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    if (selectDay) {
      selectDay(date);
    }
  };

  return (
    <div className="py-3">
      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerGroup={1}
          breakpoints={{
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            "@1.25": {
              slidesPerView: 8,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 10,
              spaceBetween: 20,
            },
          }}
          className="mx-16"
          onSlideChange={(swiper) => {
            setShowPrevButton(swiper.activeIndex !== 0);
            setShowNextButton(swiper.activeIndex !== swiper.slides.length - 1);
          }}
        >
          {listDates.map((date: dayjs.Dayjs) => (
            <SwiperSlide className=" bg-white rounded relative">
              <div
                key={date.date()}
                onClick={() => handleDate(date)}
                className={`grid grid-cols-2 text-[12px] lg:text-[16px] border-sky-700 border-[2px] p-1 lg:p-2 cursor-pointer hover:bg-sky-500 rounded
        ${selectedDate.date() === date.date() ? "bg-sky-500" : ""}`}
              >
                <div className="self-center">{date.format("MM")}</div>
                <div className="text-[32px] text-center font-bold row-span-2 self-center">
                  {date.format("DD")}
                </div>
                <div className="self-center">{date.format("ddd")}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className={`flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none
              ${!showPrevButton ? "opacity-25 cursor-default" : ""}`}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className={`flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none
              ${!showNextButton ? "opacity-25 cursor-default" : ""}`}
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
