import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
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
            "@0.00": {
              slidesPerView: 4,
              spaceBetween: 10,
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
            const currentSwiper = swiperRef.current;
            if (currentSwiper) {
              setShowNextButton(
                swiper.activeIndex !==
                  swiper.slides.length -
                    Number(currentSwiper.params.slidesPerView)
              );
            }
          }}
        >
          {listDates.map((date: dayjs.Dayjs) => (
            <SwiperSlide
              key={date.date()}
              className=" bg-white rounded relative"
            >
              <div
                onClick={() => handleDate(date)}
                className={`grid grid-cols-2 text-[12px] lg:text-[16px] border-sky-700 border-[2px] p-1 lg:p-2 cursor-pointer hover:bg-sky-500 rounded
        ${selectedDate.date() === date.date() ? "bg-sky-500" : ""}`}
              >
                <div className="self-center">{date.format("MM")}</div>
                <div className="lg:text-3xl sm:text-xl text-base text-center font-bold row-span-2 self-center">
                  {date.format("DD")}
                </div>
                <div className="self-center">{date.format("ddd")}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2
              ${!showPrevButton ? "opacity-25 cursor-default" : ""}`}
        >
          <ArrowLeftCircleIcon className="h-10 w-10 mx-4" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`absolute top-1/2 right-0 transform -translate-y-1/2
              ${!showNextButton ? "opacity-25 cursor-default" : ""}`}
        >
          <ArrowRightCircleIcon className="h-10 w-10 mx-4" />
        </button>
      </div>
    </div>
  );
};
