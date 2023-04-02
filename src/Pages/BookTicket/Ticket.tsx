import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { Food, Ticket as TicketInterface } from "../../interface/Interface";
import {
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import QRCode from "qrcode.react";

export const Ticket = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const { fetchGet: fetchTicket, result: ticket } = useGet<TicketInterface>();

  React.useEffect(() => {
    fetchTicket("ticket/" + id);
  }, []);

  return (
    <>
      {ticket && (
        <div className="flex flex-col items-center sm:mx-20 mx-5 my-5 space-y-4 min-h-screen">
          <h1 className="font-bold text-lg bg-sky-300 py-2 w-full text-center rounded">
            THÔNG TIN VÉ
          </h1>
          <div className="flex lg:flex-row flex-col lg:justify-between lg:space-x-16 bg-sky-100 py-5 sm:px-10 px-8 lg:h-[400px] w-full">
            <img
              src={ticket.movieImage}
              className="rounded sm:w-[240px] sm:h-[350px] h-[300px] w-fit mt-2 mx-auto"
            ></img>

            <div className="flex flex-col justify-between sm:mt-0 mt-2">
              <div className="space-y-1 mb-5 sm:text-base text-sm font-medium">
                <div className="line-clamp-2 my-2 font-bold">
                  <span className="border border-red-500 rounded text-red-500 px-1 mr-2">
                    C13
                  </span>
                  {ticket.movieName}
                </div>
                <p className="flex">
                  <MapPinIcon className="sm:h-6 sm:w-6 h-5 w-5 mr-1" />
                  {ticket.cinemaName}
                </p>
                <p className="flex">
                  <CalendarDaysIcon className="sm:h-6 sm:w-6 h-5 w-5 mr-1" />
                  {ticket.date}
                </p>
                <p className="flex">
                  <ClockIcon className="sm:h-6 sm:w-6 h-5 w-5 mr-1" />
                  {ticket.time}
                </p>
                <p className="flex">
                  <BuildingOfficeIcon className="sm:h-6 sm:w-6 h-5 w-5 mr-1" />
                  Phòng {ticket.room}
                </p>
              </div>
              <div className="sm:text-base text-sm font-medium">
                <div className="w-full flex justify-between mt-12">
                  <div className="ml-0">
                    GHẾ:
                    <span className="font-normal"> {ticket.seat}</span>
                  </div>

                  <span>
                    {ticket.totalTicket.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                {ticket.totalFood !== 0 && (
                  <div>
                    <div>BẮP NƯỚC:</div>

                    <div className="sm:ml-10 ml-4">
                      {ticket.foods?.map((food: Food) => {
                        return (
                          <div
                            key={food.id}
                            className="w-full flex justify-between"
                          >
                            <span className="ml-0 font-normal">
                              {food.title} x{food.quantity}
                            </span>
                            <span className="font-medium">
                              {(food.price * food.quantity).toLocaleString(
                                "vi",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-between">
                  <span>TỔNG THANH TOÁN:</span>
                  <span>
                    {(
                      (ticket.totalTicket ?? 0) + (ticket.totalFood ?? 0)
                    ).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="sm:mr-10 hidden sm:block">
                    PHƯƠNG THỨC THANH TOÁN:
                  </span>
                  <span className="sm:hidden">THANH TOÁN:</span>
                  <span className="font-normal">{ticket.paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="w-[240px] mx-auto">
              <div className="p-5 bg-white rounded my-5 h-[260px]">
                <QRCode
                  id="qrcode"
                  value={ticket.id.toString() ?? "undefined"}
                  size={200}
                  level={"H"}
                  includeMargin={false}
                />
                <p className="text-center font-bold my-2 sm:text-base text-sm">
                  {ticket.id}
                </p>
              </div>
              <p className="text-center">
                Vui lòng đưa mã QR này đến quầy vé để nhận vé của bạn
              </p>
            </div>
          </div>
        </div>
      )}

      {/* <div>{ticket && <pre>{JSON.stringify(ticket, null, 2)}</pre>}</div> */}
    </>
  );
};
