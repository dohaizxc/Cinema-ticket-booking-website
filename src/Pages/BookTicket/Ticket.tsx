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
import { Steps } from "../../components/Steps";

export const Ticket = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const { fetchGet: fetchTicket, result: ticket } = useGet<TicketInterface>();

  React.useEffect(() => {
    fetchTicket("ticket/" + id);
  }, []);

  return (
    <Layout>
      {ticket && (
        <div className="flex flex-col items-center mx-20 my-5 space-y-4 min-h-screen">
          <h1 className="font-bold text-lg bg-sky-300 py-2 w-full text-center rounded">
            THÔNG TIN VÉ
          </h1>
          <div className="flex lg:flex-row flex-col lg:justify-between lg:space-x-16 bg-sky-100 py-5 px-10 lg:h-[400px]">
            <img
              src={ticket.movieImage}
              className="rounded w-[240px] h-[350px] mt-2"
            ></img>

            <div className="flex flex-col justify-between">
              <div className="space-y-1 mb-5 text-base font-medium">
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
                  <MapPinIcon className="h-6 w-6 mr-1" />
                  {ticket.cinemaName}
                </p>
                <p className="flex">
                  <CalendarDaysIcon className="h-6 w-6 mr-1" />
                  {ticket.date}
                </p>
                <p className="flex">
                  <ClockIcon className="h-6 w-6 mr-1" />
                  {ticket.time}
                </p>
                <p className="flex">
                  <BuildingOfficeIcon className="h-6 w-6 mr-1" />
                  Phòng {ticket.room}
                </p>
              </div>
              <div className="text-base font-medium">
                <div className="w-full flex justify-between mt-12">
                  <div className="ml-0">
                    GHẾ:
                    <span className="font-normal"> {ticket.seat}</span>
                  </div>

                  <span>
                    {ticket.totalTicket.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                {ticket.totalFood !== 0 && (
                  <div>
                    <div>BẮP NƯỚC:</div>

                    <div className="ml-10">
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
                                "it-IT",
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
                  <span className="ml-0">TỔNG THANH TOÁN:</span>
                  <span>
                    {(
                      (ticket.totalTicket ?? 0) + (ticket.totalFood ?? 0)
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="mr-10">PHƯƠNG THỨC THANH TOÁN:</span>
                  <span className="font-normal">{ticket.paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="w-[240px]">
              <div className="p-5 bg-white rounded my-5 h-[260px]">
                <QRCode
                  id="qrcode"
                  value={ticket.id.toString() ?? "undefined"}
                  size={200}
                  level={"H"}
                  includeMargin={false}
                />
                <p className="text-center font-bold my-2 text-base">
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
    </Layout>
  );
};
