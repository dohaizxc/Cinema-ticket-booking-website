import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const PopUpYoutube: React.FC<{
  link: string;
  setIsShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ link, setIsShowPopUp }) => {
  return (
    <div
      className="bg-black/70 min-h-screen w-full fixed top-0 z-30"
      onClick={() => setIsShowPopUp(false)}
    >
      <div className="flex w-4/5 mx-auto items-start lg:mt-5 md:mt-20 mt-40">
        <iframe
          className="w-full lg:h-[80vh] md:h-[60vh] h-[40vh] mt-10"
          src={link}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="sm:ml-2 sm:mt-0 mt-5">
          <XMarkIcon className="sm:w-12 sm:h-12 h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
};
