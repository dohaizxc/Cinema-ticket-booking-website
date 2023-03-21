import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { Tab } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGet } from "../../api/get";
import { Movie } from "../../interface/Interface";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { FilmFormats } from "../../components/FilmFormats";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const type = [
  {
    id: 1,
    title: "PHIM ĐANG CHIẾU",
    value: true,
  },
  {
    id: 2,
    title: "PHIM SẮP CHIẾU",
    value: false,
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const swiperBanner = useRef<SwiperType>();
  const swiperRef = useRef<SwiperType>();
  const [selectedType, setSelectedType] = useState<boolean>(true);
  const { fetchGet: fetchMovies, result: movieResults } = useGet<Movie[]>();
  const [movies, setMovies] = useState<Movie[]>();

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

  useEffect(() => {
    setMovies(
      movieResults?.filter((movie: Movie) => {
        return new Date(movie.releaseDate) <= nowDay;
      }, [])
    );
  }, [movieResults]);

  useEffect(() => {
    if (selectedType === true) setMovies(nowShowing);
    else setMovies(comingSoon);
  }, [selectedType]);

  return (
    <Layout>
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
            font-bold lg:text-3xl md:text-2xl text-xs text-white drop-shadow-lg"
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
      <div className="bg-white my-5 rounded lg:mx-12 sm:mx-5 mx-0 drop-shadow-md">
        <div className="flex items-center justify-center">
          <div className="my-8 lg:w-1/2 sm:w-3/5 w-4/5">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-full bg-sky-900/20 p-1">
                {type.map((type) => (
                  <Tab
                    key={type.id}
                    onClick={() => setSelectedType(type.value)}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-full py-2.5 sm:text-base text-sm font-semibold leading-5 ",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow text-sky-700"
                          : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {type.title}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
        {movies && (
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              slidesPerGroup={1}
              breakpoints={{
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
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="sm:mx-16 mx-10"
            >
              {movies?.map((movie: Movie) => (
                <SwiperSlide key={movie._id} className=" bg-white rounded">
                  <MovieCard movie={movie} type={selectedType}></MovieCard>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="sm:px-4 px-1 absolute top-1/2 left-0 transform -translate-y-1/2"
            >
              <ChevronLeftIcon className="sm:h-10 sm:w-10 h-8 w-8 text-black bg-gray-300 hover:bg-gray-600 hover:text-white rounded-full p-1" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="sm:px-4 px-1 absolute top-1/2 right-0 transform -translate-y-1/2"
            >
              <ChevronRightIcon className="sm:h-10 sm:w-10 h-8 w-8 text-black bg-gray-300 hover:bg-gray-600 hover:text-white rounded-full p-1" />
            </button>
          </div>
        )}
        <div className="flex justify-center items-center mb-5 hover:text-sky-500">
          <button
            className="flex items-center justify-center text-base"
            onClick={() => {
              scroll(0, 0);
              navigate(`/movie`);
            }}
          >
            VIEW ALL
            <ArrowRightIcon className="inline-block h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 bg-white py-5 sm:px-12 px-5 lg:mx-12 mx-5 my-5 rounded drop-shadow-md">
        <div>
          <p className="lg:text-3xl sm:text-xl text-base font-semibold">
            Chương trình khách hàng thân thiết với nhiều ưu đãi độc quyền
          </p>
          <div className="flex space-x-5 my-4 sm:text-sm text-xs">
            <button
              className="sm:px-4 px-2 py-2 border border-transparent rounded-md font-semibold text-white
             bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
              onClick={() => {
                scroll(0, 0);
                navigate(`/newsoffer`);
              }}
            >
              TÌM HIỂU THÊM
            </button>
            <button
              className="font-semibold text-gray-400 hover:text-black px-5 py-2 mt-2"
              onClick={() => {
                scroll(0, 0);
                navigate(`/newsoffer`);
              }}
            >
              ĐÃ LÀ THÀNH VIÊN?
            </button>
          </div>
        </div>
        <div className="bg-[url('https://64.media.tumblr.com/bb52491bb4001d07c4f7542c44649f8a/940908fe8c3a4fcd-3e/s540x810/8439d3125bc1ac5fa63418b8e2a6eb5f3008b185.gif')]"></div>
      </div>

      <FilmFormats></FilmFormats>
    </Layout>
  );
};
