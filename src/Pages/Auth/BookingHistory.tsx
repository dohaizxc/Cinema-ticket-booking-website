import React from "react";
import { Ticket } from "../../interface/Interface";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import {
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export const BookingHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();
  const { fetchGet: fetchTickets, result: tickets } = useGet<Ticket[]>();

  React.useEffect(() => {
    fetchTickets("ticket/user/" + userId);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 my-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">LỊCH SỬ ĐẶT VÉ</h1>
      </div>
      <div className="flex flex-col space-y-5">
        {tickets?.map((ticket: Ticket) => (
          <div className="flex space-x-10 p-5 bg-white mx-5 rounded border border-gray-300">
            <img
              src={ticket.movieImage}
              className="rounded w-[150px] h-[200px]"
            ></img>

            <div className="flex flex-col justify-between">
              <div className="space-y-1 mb-5 font-medium">
                <div
                  className="line-clamp-2 cursor-pointer my-2 hover:text-sky-500 font-bold"
                  onClick={() => {
                    navigate(`/movie/${ticket._id}`);
                  }}
                >
                  <span className="border border-red-500 rounded text-red-500 px-1 mr-2">
                    C13
                  </span>
                  {ticket.movieName}
                </div>
                <p className="flex">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  {ticket.cinemaName}
                </p>
                <p className="flex">
                  <CalendarDaysIcon className="h-5 w-5 mr-1" />
                  {ticket.date}
                </p>
                <p className="flex">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  {ticket.time}
                </p>

                <p className="flex">
                  <BuildingOfficeIcon className="h-5 w-5 mr-1" />
                  Phòng {ticket.room}
                </p>
              </div>
              <div className="font-medium">
                <p>
                  GHẾ:
                  <span className="font-bold"> {ticket.seat}</span>
                </p>
                <p>
                  TỔNG:
                  <span className="font-bold">
                    {" "}
                    {(
                      (ticket.totalTicket ?? 0) + (ticket.totalFood ?? 0)
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
              </div>
            </div>
            <button
              className="font-semibold bg-sky-300 hover:bg-sky-700 text-black hover:text-white h-10 px-5 py-2 rounded"
              onClick={() => {
                navigate("/ticket/" + ticket?._id);
              }}
            >
              XEM
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Pagination defaultCurrent={1} total={50} className="py-4" />
      </div>
    </div>
  );
};

{
  /* <button
onClick={() => {
  navigate("/ticket/" + ticket?._id);
}}
>
XEM
</button> */
}
