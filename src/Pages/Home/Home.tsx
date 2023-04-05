import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useGet } from "../../api/get";
import { Movie } from "../../interface/Interface";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { FilmFormats } from "../../components/FilmFormats";
import { Tabs } from "../../components/Tabs";
import star from "../../assets/star.gif";
import { SwiperSlides } from "../../components/SwiperSlides";
import { Spin } from "antd";
import { NewsOffer } from "../../components/NewsOffer";

const movieBreakpoints = {
  "0": {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  "768": {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  "820": {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  "1280": {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};

export const Home = () => {
  const navigate = useNavigate();
  const swiperBanner = useRef<SwiperType>();
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const {
    fetchGet: fetchMovies,
    result: movieResults,
    isLoading: isMoviesLoading,
  } = useGet<Movie[]>();

  const nowDay = new Date("2022-12-20");
  nowDay.setHours(0, 0, 0, 0);

  const nowShowing = movieResults?.filter((movie: Movie) => {
    return new Date(movie.releaseDate) <= nowDay;
  }, []);

  const comingSoon = movieResults?.filter((movie: Movie) => {
    return new Date(movie.releaseDate) > nowDay;
  }, []);

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => swiperBanner.current?.slidePrev()}
          className="px-4 z-10 absolute top-1/2 left-0 transform -translate-y-1/2"
        >
          <ChevronLeftIcon className="sm:h-10 sm:w-10 h-8 w-8 rounded-full p-1 text-white border-2 border-gray-300" />
        </button>
        <button
          onClick={() => swiperBanner.current?.slideNext()}
          className="px-4 z-10 absolute top-1/2 right-0 transform -translate-y-1/2"
        >
          <ChevronRightIcon className="sm:h-10 sm:w-10 h-8 w-8 rounded-full p-1 text-white border-2 border-gray-300" />
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
            <div
              className="flex relative flex-col items-center justify-center sm:h-[400px] h-[300px] bg-[url('https://wallpapercave.com/wp/wp11027148.png')] bg-cover bg-center
              font-montserrat font-bold lg:text-4xl md:text-2xl text-xs text-white drop-shadow-lg"
            >
              <div className="absolute top-0 sm:h-[400px] h-[300px] bg-gray-800 opacity-50 w-full"></div>
              <p className="mt-2 z-10">KHÁM PHÁ THẾ GIỚI ĐIỆN ẢNH MA THUẬT</p>
              <p className="mt-2 z-10">CÙNG TRẢI NGHIỆM ĐẶT VÉ DỄ DÀNG</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center sm:h-[400px] h-[300px] bg-[url('https://salidasteamplant.com/wp-content/uploads/2023/02/EEAAO-Film-Poster.jpg')] bg-cover bg-center"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center sm:h-[400px] h-[300px] bg-[url('https://www.nollyverse.com/movie/img/missing.jpg')] bg-cover bg-center"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center sm:h-[400px] h-[300px] bg-[url('https://wallpapercave.com/wp/wp11854124.jpg')] bg-cover bg-center"></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="bg-white dark:bg-slate-800 dark:text-white my-5 rounded lg:mx-12 sm:mx-5 mx-0 drop-shadow-md">
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tab1="PHIM ĐANG CHIẾU"
          tab2="PHIM SẮP CHIẾU"
        ></Tabs>

        {isMoviesLoading ? (
          <div className="flex justify-center h-96">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <>
            {selectedTab && (
              <SwiperSlides
                movies={nowShowing}
                breakpoints={movieBreakpoints}
              ></SwiperSlides>
            )}

            {!selectedTab && (
              <SwiperSlides
                movies={comingSoon}
                breakpoints={movieBreakpoints}
              ></SwiperSlides>
            )}
          </>
        )}

        <div className="flex justify-center items-center hover:text-sky-500">
          <button
            className="flex items-center justify-center text-base my-5"
            onClick={() => {
              scroll(0, 0);
              navigate(`/movie`);
            }}
          >
            XEM THÊM
            <ArrowRightIcon className="inline-block h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 bg-white dark:bg-slate-800 dark:text-white py-5 sm:px-12 px-5 lg:mx-12 mx-5 my-5 rounded drop-shadow-md">
        <div className="relative">
          <p className="lg:text-2xl sm:text-xl text-base font-semibold">
            Chương trình khách hàng thân thiết với nhiều ưu đãi độc quyền
          </p>
          <div className="flex space-x-5 my-4 sm:text-sm text-xs">
            <button
              className="sm:px-4 px-2 py-2 border border-transparent rounded-md font-semibold text-white
             bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
              onClick={() => {
                scroll(0, 0);
                navigate(`/newsoffer/membership`);
              }}
            >
              TÌM HIỂU THÊM
            </button>
            <button
              className="font-semibold text-gray-400 hover:text-black px-5 py-2 mt-2"
              onClick={() => {
                scroll(0, 0);
                navigate(`/newsoffer/membership`);
              }}
            >
              ĐÃ LÀ THÀNH VIÊN?
            </button>
          </div>
        </div>
        <div className="w-full relative sm:block hidden">
          <img
            src={star}
            className="h-[220px] absolute right-0 top-[-20px] filter dark:invert"
          ></img>
        </div>
      </div>
      <NewsOffer />
      <FilmFormats />
    </>
  );
};
