import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { StarIcon, TicketIcon, GiftIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

import sliver from "../../assets/sliver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const type = [
  {
    id: 1,
    title: "THẺ THÀNH VIÊN",
    value: true,
  },
  {
    id: 2,
    title: "ƯU ĐÃI",
    value: false,
  },
];

export const NewsOffer = () => {
  const [selectedType, setSelectedType] = useState<boolean>(true);

  return (
    <Layout>
      <div className="flex lg:flex-col sm:flex-row flex-col justify-center items-center w-screen">
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
        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-gray-200 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded drop-shadow-md">
          <img src={sliver} className="lg:w-1/4 w-full rounded" />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Tích điểm 5%</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Ưu đãi mua 1 tặng 1</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Quà tặng sinh nhật</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>Tích điểm với mọi giao dịch mua vé xem phim và bắp nước</li>
              <li>Chương trình ưu đãi hấp dẫn với thành viên U22</li>
            </ul>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-yellow-100 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded drop-shadow-md">
          <img src={gold} className="lg:w-1/4 w-full rounded" />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Tích điểm 7%</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Nhận 5 vé 2D/3D</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Quà tặng sinh nhật</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>
                Yêu cầu chi tiêu tích lũy trong năm trước từ 4,000,000 VND đến
                7,999,999 VND
              </li>
              <li>Thư mời tham gia các suất chiếu đặc biệt</li>
            </ul>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-sky-200 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded drop-shadow-md">
          <img src={diamond} className="lg:w-1/4 w-full rounded" />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Tích điểm 10%</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Nhận 10 vé 2D/3D</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Quà tặng độc quyền</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>
                Yêu cầu chi tiêu tích lũy trong năm trước từ 8,000,000 VND
              </li>
              <li>Thư mời tham gia các suất chiếu đặc biệt</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
