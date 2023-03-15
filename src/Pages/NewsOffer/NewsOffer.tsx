import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { StarIcon, TicketIcon, GiftIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

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
        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-gray-200 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded">
          <img
            src="./src/assets/sliver.png"
            className="lg:w-1/4 w-full rounded"
          />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Earn points</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Buy one, get one free</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Redeem your rewards</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>
                Earn points with every transaction for movie tickets, food, and
                beverages
              </li>
              <li>Promotion program for U22 members</li>
            </ul>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-yellow-100 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded">
          <img
            src="./src/assets/gold.png"
            className="lg:w-1/4 w-full rounded"
          />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Earn points x1.5</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Get 5 free 2D/3D tickets</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Redeem your rewards</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>
                With accumulated spending ranging from 4,000,000 VND to
                7,999,999 VND throughout the year
              </li>
              <li>Invite to special screenings</li>
            </ul>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:space-x-12 bg-sky-200 lg:p-10 sm:p-5 p-10 lg:mx-16 sm:mx-2 mx-10 my-5 rounded">
          <img
            src="./src/assets/diamond.png"
            className="lg:w-1/4 w-full rounded"
          />
          <div className="lg:w-3/4 w-full lg:text-base text-sm">
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-10 font-medium lg:space-y-0 space-y-2 lg:my-0 my-2">
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 lg:space-x-0 space-x-2">
                <StarIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Earn points x2</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center  lg:space-y-2 space-x-2">
                <TicketIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Get 10 free 2D/3D tickets</p>
              </div>
              <div className="lg:h-[40px] lg:w-0 w-full border border-gray-400"></div>
              <div className="flex lg:flex-col flex-row items-center lg:space-y-2 space-x-2">
                <GiftIcon className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 text-black font-thin" />
                <p>Redeem exclusive rewards</p>
              </div>
            </div>
            <div className="w-full border border-gray-400 lg:my-5"></div>
            <ul className="list-disc mx-5 lg:mt-0 mt-2">
              <li>
                With accumulated spending ranging from 10,000,000 VND throughout
                the year
              </li>
              <li>Invite to special screenings</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
