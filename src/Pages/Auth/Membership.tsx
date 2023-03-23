import React from "react";
import { Membership as MembershipPage } from "../../components/Membership";

export const Membership = () => {
  return (
    <div className="sm:min-h-screen bg-white rounded drop-shadow-md py-5">
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 mb-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">CHÍNH SÁCH THÀNH VIÊN</h1>
      </div>
      <div
        className="lg:block lg:scale-50 lg:mx-[-290px] lg:mt-[-220px]
      sm:hidden scale-90 mx-[-20px] mt-[-90px]"
      >
        <MembershipPage></MembershipPage>
      </div>
    </div>
  );
};
