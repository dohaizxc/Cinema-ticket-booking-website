import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Step {
  id: number;
  name: string;
}

export const Steps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps: Step[] = [
    { id: 1, name: "Chọn ghế" },
    { id: 2, name: "Mua bắp nước" },
    { id: 3, name: "Thanh toán" },
  ];

  return (
    <div className="flex items-center justify-center sm:gap-x-5 gap-x-3 text-sm sm:text-sx text-center text-black sm:text-base">
      {steps.map((step: Step) => (
        <div
          key={step.id}
          className={`flex items-center ${
            currentStep === step.id ? "text-sky-500 font-semibold " : ""
          }`}
        >
          <span className="flex items-center">
            {step.id < currentStep ? (
              <span className="flex items-center justify-center sm:h-8 sm:w-8 h-6 w-6 bg-[#e6f4ff] rounded-full sm:mr-2 mr-1">
                <CheckIcon className="sm:h-5 sm:w-5 h-4 w-4 text-sky-500" />
              </span>
            ) : step.id === currentStep ? (
              <div className="relative mr-2 h-8 w-8 bg-[#e6f4ff] rounded-full">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 animate-spin fill-sky-500"
                  viewBox="0 0 100 101"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
                </svg>
                <span className="absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]">
                  {step.id}
                </span>
              </div>
            ) : (
              <span className="sm:h-8 sm:w-8 h-6 w-6 py-0.5 bg-gray-300 rounded-full sm:mr-2 mr-1">
                {step.id}
              </span>
            )}
            {step.name}
          </span>
          {step.id < steps.length && (
            <span
              className={`hidden sm:block w-20 h-0 ml-3 border ${
                step.id < currentStep ? "border-sky-500" : "bg-gray-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
