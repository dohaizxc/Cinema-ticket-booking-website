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
          <div className="flex flex-col items-center justify-center bg-white sm:h-[85vh] h-[60vh]   rounded">
            <img
              src="https://static.vecteezy.com/system/resources/previews/011/835/419/original/crossed-pair-retro-cinema-tickets-png.png"
              className="w-2/3"
            />

            <h1 className="font-bold text-xl my-5">ĐẶT VÉ NHANH CHÓNG</h1>
            <p className="text-base">Khám phá thế giới điện ảnh ma thuật</p>
            <p className="text-base">cùng trải nghiệm đặt vé dễ dàng</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center bg-white sm:h-[85vh] h-[60vh]   rounded">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/color-work-icon/promotion-2.png"
              className="w-2/5"
            />
            <h1 className="font-bold text-xl my-5">CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
            <p className="text-base">Nhiều chương trình ưu đãi hấp dẫn</p>
            <p className="text-base">dành cho thành viên UIT CINEMA</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center  bg-white sm:h-[85vh] h-[60vh]   rounded">
            <img
              src="https://cdn3.iconfinder.com/data/icons/cyber-monday-astute-vol-1-1/512/Earn_Reward_Points-512.png"
              className="w-2/5"
            />
            <h1 className="font-bold text-xl my-5">CHƯƠNG TRÌNH TÍCH ĐIỂM</h1>
            <p className="text-base">1 điểm = 1000 VND</p>
            <p className="text-base">tại các rạp trên toàn quốc</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center  bg-white sm:h-[85vh] h-[60vh]   rounded">
            <img
              src="https://static.vecteezy.com/system/resources/previews/011/016/159/original/realistic-3d-gift-box-cutout-free-png.png"
              className="w-2/5"
            />
            <h1 className="font-bold text-xl my-5">QUÀ TẶNG SINH NHẬT</h1>
            <p className="text-base">Quà tặng sinh nhật</p>
            <p className="text-base">dành cho mọi thành viên UIT CINEMA</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
