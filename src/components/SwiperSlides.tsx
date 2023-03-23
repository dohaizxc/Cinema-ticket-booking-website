import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Movie, NewsOffer } from "../interface/Interface";
import { MovieCard } from "./MovieCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import errImage from "../assets/img/news_img_n1.jpg";

export const SwiperSlides: React.FC<{
  movies?: Movie[];
  newsOffers?: NewsOffer[];
  breakpoints: any;
}> = ({ movies, newsOffers, breakpoints }) => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType>();
  const [isRender, setIsRender] = useState<boolean>();

  useEffect(() => {
    if (movies || newsOffers) setIsRender(true);
  }, [movies, newsOffers]);

  return (
    <div className="relative">
      {isRender && (
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
          breakpoints={breakpoints}
          modules={[Autoplay, Pagination, Navigation]}
          className="sm:mx-16 mx-10"
        >
          {newsOffers &&
            newsOffers.map((newsOffer: NewsOffer) => (
              <SwiperSlide key={newsOffer.id}>
                <div>
                  <img
                    className="sm:h-fit rounded transition ease-in-out delay-150 hover:scale-105 duration-300"
                    src={newsOffer.img}
                    alt={newsOffer.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = errImage;
                    }}
                  />
                  <h1
                    className="h-12 line-clamp-2 text-sm text-center font-semibold uppercase cursor-pointer pt-2 hover:text-sky-500"
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/newsoffer/detail/${newsOffer.id}`);
                    }}
                  >
                    {newsOffer.name}
                  </h1>
                </div>
              </SwiperSlide>
            ))}

          {movies &&
            movies.map((movie: Movie) => (
              <SwiperSlide key={movie._id} className=" bg-white rounded">
                <MovieCard movie={movie} type={true}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
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
  );
};
