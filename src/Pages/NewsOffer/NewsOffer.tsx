import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { useGet } from "../../api/get";
import { NewsOffer as NewsOfferInterface } from "../../interface/Interface";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd";
import errImage from "../../assets/img/news_img_n1.jpg";

export const NewsOffer = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  const {
    fetchGet,
    result: newsOffers,
    isLoading,
  } = useGet<NewsOfferInterface[]>();

  useEffect(() => {
    fetchGet("newsoffer/offer");
  }, []);

  useEffect(() => {
    if (selectedTab) fetchGet("newsoffer/offer");
    else fetchGet("newsoffer/news");
  }, [selectedTab]);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 dark:text-white">
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tab1="ƯU ĐÃI"
          tab2="TIN MỚI"
        ></Tabs>

        {isLoading ? (
          <div className="flex justify-center min-h-screen">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center lg:gap-y-10 gap-y-5 lg:gap-x-10 gap-x-5 mb-10">
            {newsOffers?.map((newsOffer: NewsOfferInterface) => {
              return (
                <div key={newsOffer.id} className="md:w-60 sm:w-50 w-40">
                  <img
                    className="rounded transition ease-in-out delay-150 hover:scale-105 duration-300 cursor-pointer"
                    src={newsOffer.img}
                    alt={newsOffer.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = errImage;
                    }}
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/newsoffer/detail/${newsOffer.id}`);
                    }}
                  />
                  <h1
                    className="sm:h-12 h-10 line-clamp-2 sm:text-sm text-xs text-center font-semibold uppercase cursor-pointer pt-2 hover:text-sky-500"
                    onClick={() => {
                      scroll(0, 0);
                      navigate(`/newsoffer/detail/${newsOffer.id}`);
                    }}
                  >
                    {newsOffer.name}
                  </h1>
                  <div className="flex sm:space-x-2 space-x-1 items-center pt-1 sm:px-2 pb-2">
                    <CalendarDaysIcon className="sm:h-6 sm:w-6 h-4 w-4" />
                    <p className="sm:text-sm text-xs">{newsOffer.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
