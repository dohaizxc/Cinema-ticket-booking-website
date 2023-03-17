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
    <Layout>
      {ticket && (
        <div className="flex flex-col items-center justify-center mx-20 my-10 space-y-4">
          <h1 className="font-bold text-[20px] bg-sky-300 py-2 w-full text-center rounded">
            THÔNG TIN VÉ
          </h1>
          <div className="flex lg:flex-row flex-col lg:space-x-10 bg-sky-100 py-5 px-10">
            <img
              src={ticket.movieImage}
              className="rounded w-[200px] h-[300px]"
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

                  <span className="mr-[50px]">
                    {ticket.totalTicket.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                {ticket.totalFood !== 0 && (
                  <div>
                    <div>BẮP NƯỚC:</div>

                    <div className="ml-[50px] pl-50px">
                      {ticket.foods?.map((food: Food) => {
                        return (
                          <div
                            key={food.id}
                            className="w-full flex justify-between"
                          >
                            <span className="ml-0 font-normal">
                              {food.title} x{food.quantity}
                            </span>
                            <span className="font-bold mr-[50px]">
                              {food.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-between">
                  <span className="ml-0">TỔNG THANH TOÁN:</span>
                  <span className="mr-[50px]">
                    {" "}
                    {(
                      (ticket.totalTicket ?? 0) + (ticket.totalFood ?? 0)
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="ml-0">PHƯƠNG THỨC THANH TOÁN:</span>
                  <span className="mr-[50px] font-normal">
                    {ticket.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      )}

      {/* <div>{ticket && <pre>{JSON.stringify(ticket, null, 2)}</pre>}</div> */}
    </Layout>
  );
};
