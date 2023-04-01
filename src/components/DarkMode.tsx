import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <div>
      <div className={`w-24 m-40 relative`}>
        <div className="bg-gray-300 w-24 h-10 rounded-full absolute left-0"></div>
        <div
          className={`absolute w-10 h-10 flex justify-center items-center cursor-pointer rounded-full
          transform transition-all duration-500 ${
            isDarkMode
              ? "bg-yellow-100 translate-x-[56px]"
              : "bg-yellow-100 translate-x-0"
          }`}
        ></div>
        <div
          className={`absolute left-0 w-10 h-10 flex justify-center items-center cursor-pointer rounded-full ${
            isDarkMode
              ? "text-gray-500 animate-scaleout"
              : "text-yellow-500 animate-scale"
          }`}
          onClick={() => {
            if (isDarkMode) setIsDarkMode(!isDarkMode);
          }}
        >
          <SunIcon className={`h-6 w-6`} />
        </div>
        <div
          className={`absolute right-0 w-10 h-10 flex justify-center items-center cursor-pointer rounded-full ${
            isDarkMode
              ? "text-yellow-500 animate-scale"
              : "text-gray-500 animate-scaleout"
          }`}
          onClick={() => {
            if (!isDarkMode) setIsDarkMode(!isDarkMode);
          }}
        >
          <MoonIcon className={`h-6 w-6`} />
        </div>
      </div>
    </div>
  );
};
