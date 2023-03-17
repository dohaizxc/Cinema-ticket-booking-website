import React, { useState } from "react";
import { Ticket } from "../../interface/Interface";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Pagination, Spin } from "antd";
import {
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const BookingHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();
  const {
    fetchGet: fetchTickets,
    result: tickets,
    isLoading,
  } = useGet<Ticket[]>();

  React.useEffect(() => {
    fetchTickets("ticket/user/" + userId);
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 5;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentTickets = tickets
    ?.slice(0)
    .reverse()
    .slice(indexOfFirstImage, indexOfLastImage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white rounded drop-shadow-md py-5">
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 mb-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">LỊCH SỬ ĐẶT VÉ</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center min-h-screen">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          {currentPage ? (
            <>
              <div className="flex flex-col space-y-5">
                {currentTickets?.map((ticket: Ticket) => (
                  <div className="flex sm:flex-row flex-col items-center sm:space-x-10 p-5 bg-white border mx-5 rounded drop-shadow-md relative">
                    <img
                      src={ticket.movieImage}
                      className="rounded w-[150px] h-[200px]"
                    ></img>

                    <div className="flex flex-col justify-between">
                      <div className="space-y-1 mb-5 font-medium">
                        <div
                          className="line-clamp-2 cursor-pointer my-2 hover:text-sky-500 font-bold"
                          onClick={() => {
                            scroll(0, 0);
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
                              (ticket.totalTicket ?? 0) +
                              (ticket.totalFood ?? 0)
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      className="sm:block hidden px-4 z-10 absolute top-1/2 right-0 transform -translate-y-1/2 hover:text-sky-700"
                      onClick={() => {
                        scroll(0, 0);
                        navigate("/ticket/" + ticket?._id);
                      }}
                    >
                      <ChevronRightIcon className="sm:h-10 sm:w-10 h-8 w-8" />
                    </button>

                    <button
                      className="sm:hidden block px-4 py-2 border border-transparent rounded-md font-semibold text-white
                                  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
                      onClick={() => {
                        scroll(0, 0);
                        navigate("/ticket/" + ticket?._id);
                      }}
                    >
                      CHI TIẾT
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={imagesPerPage}
                  total={tickets?.length}
                  onChange={handlePageChange}
                  className="pt-5"
                />
              </div>
            </>
          ) : (
            <p className="my-5">Không có lịch sử đặt vé</p>
          )}
        </>
      )}
    </div>
  );
};
