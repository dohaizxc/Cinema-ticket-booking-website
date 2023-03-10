import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { Ticket as TicketInterface } from "../../interface/Interface";
import Barcode from "react-barcode";
import { Modal } from "../../components/Modal/Modal";
export const Ticket = () => {
  const param = useParams();
  const id = param.id;
  const { fetchGet: fetchTicket, result: ticket } = useGet<TicketInterface>();

  React.useEffect(() => {
    fetchTicket("ticket/" + id);
  }, []);

  console.log(ticket);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mx-60 space-y-4">
        <h1 className="font-bold text-[20px] bg-sky-300 py-2 w-full text-center rounded">
          THANH TOÁN THÀNH CÔNG
        </h1>
        <Barcode value={ticket?.id.toString() ?? "undefined"} />
        <h1 className="font-bold text-[20px] bg-sky-300 py-2 w-full text-center rounded">
          THÔNG TIN VÉ
        </h1>
        <div className="flex space-x-10">
          <div className="w-2/5">
            <img src={ticket?.movieImage} className="rounded"></img>
          </div>
          <div className="ml-[50px] text-start w-3/5 mb-5 text-[16px] font-bold">
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
            {ticket?.totalFood !== 0 && (
              <div>
                <div>BẮP NƯỚC:</div>

                <div className="ml-[50px] pl-50px">
                  {ticket?.foods?.map((food, index) => {
                    return (
                      <div className="w-full flex justify-between">
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
          </div>
        </div>
      </div>

      {/* <div>{ticket && <pre>{JSON.stringify(ticket, null, 2)}</pre>}</div> */}
    </Layout>
  );
};
