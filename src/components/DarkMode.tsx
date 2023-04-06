import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const sunIcon = document.querySelector(".sunIcon");
  const moonIcon = document.querySelector(".moonIcon");

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }

  // add event listener for resize event
  window.addEventListener("resize", handleResize);

  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else setIsDarkMode(false);
  };

  useEffect(() => {
    themeCheck();
  }, [userTheme]);

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleSunIconClick = () => {
    // const sunIcon = document.getElementById("sunIcon");
    // const moonIcon = document.getElementById("moonIcon");
    if (isDarkMode) {
      // if (sunIcon) {
      //   // sunIcon.classList.remove("animate-scaleout");
      //   sunIcon.classList.add("text-yellow-500");
      //   console.log("sunIcon", sunIcon.classList);
      // }
      // if (moonIcon) {
      //   console.log("moonIcon", moonIcon.classList);
      //   // moonIcon.classList.remove("animate-scale");
      //   moonIcon.classList.add("animate-scaleout");
      // }
      setIsDarkMode(!isDarkMode);
      themeSwitch();
    }
  };

  const handleMoonIconClick = () => {
    // const sunIcon = document.getElementById("sunIcon");
    // const moonIcon = document.getElementById("moonIcon");
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
      themeSwitch();
    }
  };

  return (
    <div>
      {screenWidth >= 640 ? (
        <div className={`w-16 relative`}>
          <div className="bg-sky-200 dark:bg-sky-100 w-16 h-8 rounded-full absolute left-0"></div>
          <div
            className={`absolute w-8 h-8 flex justify-center items-center rounded-full
          transform transition-all duration-500 bg-yellow-100 ${
            isDarkMode ? "translate-x-8" : "translate-x-0"
          }`}
          ></div>
          <div
            id="sunIcon"
            className={`sunIcon absolute left-0 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full ${
              isDarkMode
                ? "text-gray-500 animate-scale"
                : "text-yellow-500 animate-scaleout"
            }`}
            onClick={handleSunIconClick}
          >
            <SunIcon className={`h-5 w-5`} />
          </div>
          <div
            id="moonIcon"
            className={`moonIcon absolute right-0 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full ${
              isDarkMode
                ? "text-yellow-500 animate-scaleout bg-yellow-100"
                : "text-gray-500 animate-scale"
            }`}
            onClick={handleMoonIconClick}
          >
            <MoonIcon className={`h-5 w-5`} />
          </div>
        </div>
      ) : (
        <div className={`w-8 sm:hidden block`}>
          <div
            className={`text-yellow-500 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full bg-yellow-100
              ${isDarkMode ? "animate-scale" : "animate-scaleout"}`}
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              themeSwitch();
            }}
          >
            <SunIcon
              className={`h-5 w-5
          ${isDarkMode ? "hidden" : "block"}`}
            />
            <MoonIcon
              className={`h-5 w-5
          ${isDarkMode ? "block" : "hidden"}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
