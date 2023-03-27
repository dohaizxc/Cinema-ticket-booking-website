import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd";
import { Tabs } from "./Tabs";
import { SwiperSlides } from "./SwiperSlides";
import { NewsOffer as NewsOfferInterface } from "../interface/Interface";
import { useGet } from "../api/get";

const newofferBreakpoints = {
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
    slidesPerView: 4,
    spaceBetween: 20,
  },
};

export const NewsOffer = () => {
  const navigate = useNavigate();

  const [selectedTabNews, setSelectedTabNews] = useState<boolean>(true);

  const {
    fetchGet: fetchNews,
    result: newsResults,
    isLoading: isNewsLoading,
  } = useGet<NewsOfferInterface[]>();
  const {
    fetchGet: fetchOffer,
    result: offerResults,
    isLoading: isOfferLoading,
  } = useGet<NewsOfferInterface[]>();

  useEffect(() => {
    fetchOffer("newsoffer/offer");
  }, []);

  useEffect(() => {
    if (selectedTabNews) {
      fetchOffer("newsoffer/offer");
    } else {
      fetchNews("newsoffer/news");
    }
  }, [selectedTabNews]);

  return (
    <div className="bg-white my-5 rounded lg:mx-12 sm:mx-5 mx-0 drop-shadow-md">
      <Tabs
        setSelectedTab={setSelectedTabNews}
        tab1="ƯU ĐÃI"
        tab2="TIN TỨC"
      ></Tabs>
      {selectedTabNews && (
        <>
          {isOfferLoading ? (
            <div className="flex justify-center h-60">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <SwiperSlides
              newsOffers={offerResults}
              breakpoints={newofferBreakpoints}
            ></SwiperSlides>
          )}
        </>
      )}

      {!selectedTabNews && (
        <>
          {isNewsLoading ? (
            <div className="flex justify-center h-60">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <SwiperSlides
              newsOffers={newsResults}
              breakpoints={newofferBreakpoints}
            ></SwiperSlides>
          )}
        </>
      )}

      <div className="flex justify-center items-center hover:text-sky-500">
        <button
          className="flex items-center justify-center text-base my-5"
          onClick={() => {
            scroll(0, 0);
            navigate(`/newsoffer`);
          }}
        >
          XEM THÊM
          <ArrowRightIcon className="inline-block h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};
