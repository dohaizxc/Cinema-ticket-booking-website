import { Tab } from "@headlessui/react";
import React, { useRef, useState, useLayoutEffect } from "react";

export const Tabs: React.FC<{
  selectedTab: boolean;
  setSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
  tab1: string;
  tab2: string;
}> = ({ selectedTab, setSelectedTab, tab1, tab2 }) => {
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

  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth - 4);
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="my-8 lg:w-1/2 sm:w-3/5 w-11/12">
        <Tab.Group>
          <Tab.List className="flex rounded-full bg-sky-900/20 p-1 relative">
            <div
              className="absolute w-1/2 h-[44px] flex justify-center items-center rounded-full
                transform transition-all duration-400 bg-white dark:bg-sky-800 shadow"
              style={{
                transform: selectedTab
                  ? "translateX(0)"
                  : `translateX(${width}px)`,
              }}
            ></div>

            <Tab
              ref={ref}
              onClick={() => setSelectedTab(tabs[0].value)}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-full py-2.5 sm:text-base text-sm font-bold leading-5 z-10",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-sky-700 dark:text-white"
                    : "text-gray-500 hover:bg-white/[0.12] hover:text-sky-700 dark:hover:text-white"
                )
              }
            >
              {tabs[0].title}
            </Tab>
            <Tab
              onClick={() => setSelectedTab(tabs[1].value)}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-full py-2.5 sm:text-base text-sm font-bold leading-5 z-10",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-sky-700 dark:text-white"
                    : "text-gray-500 hover:bg-white/[0.12] hover:text-sky-700 dark:hover:text-white"
                )
              }
            >
              {tabs[1].title}
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};
