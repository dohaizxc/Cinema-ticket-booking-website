import { Tab } from "@headlessui/react";
import React, { useState } from "react";

export const Tabs: React.FC<{
  setSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
  tab1: string;
  tab2: string;
}> = ({ setSelectedTab, tab1, tab2 }) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const tabs = [
    {
      id: 1,
      title: tab1,
      value: true,
    },
    {
      id: 2,
      title: tab2,
      value: false,
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="my-8 lg:w-1/2 sm:w-3/5 w-11/12">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-full bg-sky-900/20 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                onClick={() => setSelectedTab(tab.value)}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-full py-2.5 sm:text-base text-sm font-bold leading-5 ",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow text-sky-700"
                      : "text-gray-500 hover:bg-white/[0.12] hover:text-sky-700"
                  )
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};
