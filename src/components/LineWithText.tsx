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
    <div className="flex justify-center items-center h-16">
      <div className="w-1/5 sm:w-1/4 lg:w-1/2 h-1 bg-gray-600"></div>
      <div className="text-center w-1/3">
        <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-900">
          {props.children}
        </span>
      </div>
      <div className="w-1/5 sm:w-1/4 lg:w-1/2 h-1 bg-gray-600"></div>
    </div>
  );
};
