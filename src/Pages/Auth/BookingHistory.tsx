import React from "react";
import { Ticket, User } from "../../interface/Interface";
import { useGet } from "../../api/get";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

export const BookingHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();
  const { fetchGet: fetchTickets, result: tickets } = useGet<Ticket[]>();

  React.useEffect(() => {
    fetchTickets("ticket/user/" + userId);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center bg-sky-300 rounded h-10 my-5 mx-20">
        <h1 className="font-semibold text-base">LỊCH SỬ ĐẶT VÉ</h1>
      </div>
      <div className="flex flex-col  space-y-5">
        {tickets?.map((ticket: Ticket) => (
          <div>
            <div className="flex space-x-10 ml-10">
              <div className="w-1/3">
                <img src={ticket?.movieImage} className="rounded"></img>
              </div>
              <div className="ml-[50px] text-start w-2/3 mb-5 text-[14px] font-bold">
                <p>TÊN PHIM: {ticket?.movieName}</p>
                <p>
                  THỜI GIAN:
                  <span className="font-normal"> {ticket?.time}</span>
                </p>
                <div>
                  NGÀY:
                  <span className="font-normal"> {ticket?.date}</span>
                </div>
                <div>
                  RẠP:
                  <span className="font-normal"> {ticket?.cinemaName}</span>
                </div>
                <div>
                  PHÒNG:
                  <span className="font-normal"> {ticket?.room}</span>
                </div>

                <div className="w-full flex justify-between mt-[30px]">
                  <div className="ml-0">
                    GHẾ:
                    <span className="font-normal"> {ticket?.seat}</span>
                  </div>

                  <span className="mr-[50px]">
                    {ticket?.totalTicket.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="ml-0">TỔNG THANH TOÁN:</span>
                  <span className="mr-[50px]">
                    {" "}
                    {(
                      (ticket?.totalTicket ?? 0) + (ticket?.totalFood ?? 0)
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="ml-0">PHƯƠNG THỨC THANH TOÁN:</span>
                  <span className="mr-[50px] font-normal">
                    {ticket?.paymentMethod}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/ticket/" + ticket?._id);
                  }}
                >
                  XEM
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Pagination defaultCurrent={1} total={50} className="py-4" />
      </div>
    </div>
  );
};
