import React, { useRef, useEffect } from "react";

export const LineWithText = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div className="relative h-16">
      <div className="absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%] w-full h-1 bg-gray-600"></div>
      <div className="absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%] bg-gray-100 dark:bg-[#0A1D2C] sm:px-4 px-2">
        <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-900 dark:text-sky-500">
          {props.children}
        </span>
      </div>
    </div>
  );
};
