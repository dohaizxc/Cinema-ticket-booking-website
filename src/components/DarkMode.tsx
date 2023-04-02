import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [key, setKey] = useState<number>(0);

  const handleSunIconClick = () => {
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");
    if (isDarkMode) {
      if (sunIcon) {
        // sunIcon.classList.remove("animate-scaleout");
        sunIcon.classList.add("text-yellow-500");
        console.log("sunIcon", sunIcon.classList);
      }
      if (moonIcon) {
        console.log("moonIcon", moonIcon.classList);
        // moonIcon.classList.remove("animate-scale");
        moonIcon.classList.add("animate-scaleout");
      }
      setIsDarkMode(!isDarkMode);
      setKey(key + 1);
    }
  };

  const handleMoonIconClick = () => {
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");
    if (!isDarkMode) {
      // if (sunIcon) {
      //   console.log("sunIcon", sunIcon.classList);
      //   // sunIcon.classList.remove("animate-scale");
      //   sunIcon.classList.add("animate-scaleout");
      // }
      // if (moonIcon) {
      //   console.log("moonIcon", moonIcon.classList);
      //   // moonIcon.classList.remove("animate-scaleout");
      //   moonIcon.classList.add("animate-scale");
      // }
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <div>
      <div className={`w-16 relative`}>
        <div className="bg-sky-200 w-16 h-8 rounded-full absolute left-0"></div>
        <div
          className={`absolute w-8 h-8 flex justify-center items-center cursor-pointer rounded-full
          transform transition-all duration-500 ${
            isDarkMode
              ? "bg-yellow-100 translate-x-8"
              : "bg-yellow-100 translate-x-0"
          }`}
        ></div>
        {key >= 0 && (
          <div
            id="sunIcon"
            className={`absolute left-0 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full ${
              isDarkMode
                ? "text-gray-500 animate-scale"
                : "text-yellow-500 animate-scaleout"
            }`}
            onClick={handleSunIconClick}
          >
            <SunIcon className={`h-5 w-5`} />
          </div>
        )}
        <div
          id="moonIcon"
          className={`absolute right-0 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full ${
            isDarkMode
              ? "text-yellow-500 animate-scaleout"
              : "text-gray-500 animate-scale"
          }`}
          onClick={handleMoonIconClick}
        >
          <MoonIcon className={`h-5 w-5`} />
        </div>
      </div>
    </div>
  );
};
