import React from "react";
import IMAX from "../assets/IMAX.png";
import _4DX from "../assets/4DX.png";
import DolbyAtmos from "../assets/Dolby_Atmos.png";
import Lamour from "../assets/Lamour.png";
import ScreenX from "../assets/ScreenX.png";

const filmFormats: string[] = [IMAX, _4DX, DolbyAtmos, ScreenX, Lamour];

export const FilmFormats = () => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-800 m-5 sm:py-10 py-5 lg:mx-12 rounded drop-shadow-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center lg:text-2xl sm:text-xl text-base font-semibold leading-8 text-gray-900 dark:text-white">
            Nhiều phòng chiếu với đa dạng các định dạng
          </h2>
          <div className="flex flex-wrap justify-center sm:gap-x-10 gap-x-5 sm:gap-y-12 gap-y-5 sm:mt-10 mt-5">
            {filmFormats.map((format: string, index: number) => (
              <img
                key={index}
                className="md:h-[48px] md:w-[158px] sm:h-[40px] sm:w-[120px] h-[27px] w-[81px] filter dark:invert"
                src={format}
                alt={format}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
