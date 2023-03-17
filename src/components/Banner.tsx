import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Autoplay, Pagination } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Banner = () => {
  const swiperBanner = useRef<SwiperType>();
  return (
    <div className="relative">
      <button
        onClick={() => swiperBanner.current?.slidePrev()}
        className="px-4 z-10 absolute top-1/2 left-0 transform -translate-y-1/2"
      >
        <ChevronLeftIcon className="sm:h-10 sm:w-10 h-8 w-8" />
      </button>
      <button
        onClick={() => swiperBanner.current?.slideNext()}
        className="px-4 z-10 absolute top-1/2 right-0 transform -translate-y-1/2"
      >
        <ChevronRightIcon className="sm:h-10 sm:w-10 h-8 w-8" />
      </button>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperBanner.current = swiper;
        }}
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-300 to-indigo-300 h-[85vh] rounded">
            <h1 className="font-bold text-xl my-5">ĐẶT VÉ NHANH CHÓNG</h1>
            <p className="text-base">
              Trải nghiệm thế giới phim kỳ diệu với UIT CINEMA
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-300 to-indigo-300 h-[85vh] rounded">
            <h1 className="font-bold text-xl my-5">CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
            <p className="text-base">
              Nhiều chương trình hấp dẫn dành cho thành viên UIT CINEMA
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-sky-300 to-indigo-300 h-[85vh] rounded">
            <h1 className="font-bold text-xl my-5">CHƯƠNG TRÌNH TÍCH ĐIỂM</h1>
            <p className="text-base">1 điểm = 1000 VND</p>
            <p className="text-base">tại các rạp trên toàn quốc</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-sky-300 to-indigo-300 h-[85vh] rounded">
            <h1 className="font-bold text-xl my-5">QUÀ TẶNG SINH NHẬT</h1>
            <p className="text-base">Quà tặng sinh nhật</p>
            <p className="text-base">dành cho mọi thành viên UIT CINEMA</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
