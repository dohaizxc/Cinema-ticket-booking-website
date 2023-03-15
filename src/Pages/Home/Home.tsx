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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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

  useEffect(() => {
    fetchMovies("movie");
  }, []);

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
            <div className="flex items-center justify-center bg-gray-400 h-[300px]">
              <div className="font-bold text-3xl">Slide 1</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center bg-gray-400 h-[300px]">
              <div className="font-bold text-3xl">Slide 2</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center bg-gray-400 h-[300px]">
              <div className="font-bold text-3xl">Slide 3</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center bg-gray-400 h-[300px]">
              <div className="font-bold text-3xl">Slide 4</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="bg-white my-4 rounded lg:mx-12 sm:mx-5 mx-0">
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
        {movieResults && (
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
              {movieResults?.map((movie: Movie) => (
                <SwiperSlide className=" bg-white rounded">
                  <MovieCard movie={movie}></MovieCard>
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
            className="flex items-center justify-center"
            onClick={() => {
              navigate(`/movie`);
            }}
          >
            VIEW ALL
            <ChevronRightIcon className="inline-block h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 bg-white py-5 px-12 lg:mx-12 mx-5 my-5 rounded">
        <div>
          <p className="lg:text-3xl sm:text-xl text-base font-semibold">
            Introducing an exclusive loyalty program that pays you back!
          </p>
          <div className="flex space-x-5 my-4">
            <button className=" font-semibold bg-sky-300 hover:bg-sky-700 text-black hover:text-white px-5 py-2 mt-2 rounded">
              KNOW MORE
            </button>
            <button className="font-semibold text-gray-400 hover:text-black px-5 py-2 mt-2">
              ALREADY A MEMBER?
            </button>
          </div>
        </div>
        <div className="bg-[url('https://64.media.tumblr.com/bb52491bb4001d07c4f7542c44649f8a/940908fe8c3a4fcd-3e/s540x810/8439d3125bc1ac5fa63418b8e2a6eb5f3008b185.gif')]"></div>
      </div>

      <div className="bg-white m-5 sm:py-10 py-5 lg:mx-12 rounded">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center sm:text-lg text-base font-semibold leading-8 text-gray-900">
            Nhiều phòng chiếu với đa dạng các định dạng
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/IMAX.svg/1280px-IMAX.svg.png"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/4DX_2019_logo.svg/2560px-4DX_2019_logo.svg.png"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="data:image/png;base64,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"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Logo_Dolby_Atmos.svg/1280px-Logo_Dolby_Atmos.svg.png"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://images.squarespace-cdn.com/content/v1/634e01d957b6426b108e4861/1e1d07c0-a3ee-4cf0-acdf-5c290478f63a/Lamour.png"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
