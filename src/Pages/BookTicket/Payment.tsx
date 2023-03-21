import React, { useEffect, useState } from "react";
import { TagsOutlined } from "@ant-design/icons";
import { Food } from "../../interface/Interface";
import { RadioGroup } from "@headlessui/react";
import {
  faCcMastercard,
  faCcVisa,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const payments = [
  {
    name: "Thẻ Mastercard",
    icon: faCcMastercard,
  },
  {
    name: "Thẻ Visa",
    icon: faCcVisa,
  },
  {
    name: "Thẻ Paypal",
    icon: faCcPaypal,
  },
];

export const Payment: React.FC<{
  seatPrice: number;
  listFoods: Food[];
  totalPrice: number;
  setSelectedPayment: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ seatPrice, listFoods, totalPrice, setSelectedPayment }) => {
  const [typeVoucher, setTypeVoucher] = React.useState<0 | 1 | 2>(0);

  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div>
      <div className="grid sm:grid-cols-2 sm:mx-20 mx-5 sm:space-x-10 ">
        <div className="space-y-4">
          <div className="border border-sky-300 rounded h-auto py-4 px-7 space-y-3">
            <TagsOutlined className="text-[24px]" />
            <span className="font-bold text-[16px] mx-2">GIẢM GIÁ</span>
            <button
              className="block w-full text-left rounded text-[16px] bg-sky-200 p-2"
              onClick={() => {
                typeVoucher === 1 ? setTypeVoucher(0) : setTypeVoucher(1);
              }}
            >
              Điểm
            </button>

            {typeVoucher == 1 && (
              <div className="py-2 space-y-3">
                <div className="flex justify-between mx-4">
                  <p>Điểm của bạn</p>
                  <p>999 điểm</p>
                </div>

                <div className="flex justify-between mx-4">
                  <p>Nhập số điểm</p>
                  <input type="number" min={0} className="p-2 rounded"></input>
                </div>

                <div className="flex justify-end px-4">
                  <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Xác nhận
                  </button>
                </div>
              </div>
            )}

            <button
              className="block w-full text-left rounded [16px] bg-sky-200 p-2"
              onClick={() => {
                typeVoucher === 2 ? setTypeVoucher(0) : setTypeVoucher(2);
              }}
            >
              Voucher
            </button>

            {typeVoucher === 2 && (
              <div className="py-2 space-y-3">
                <div className="flex justify-between mx-4">
                  <p>Nhập mã voucher</p>
                  <input className="p-2 rounded"></input>
                </div>

                <div className="flex justify-end px-4">
                  <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Xác nhận
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border border-sky-300 rounded h-auto p-4 space-y-3">
            <i className="fa-solid fa-money-check-dollar text-[24px]"></i>

            <div className="inline-flex font-bold text-[16px] mx-2">
              PHƯƠNG THỨC THANH TOÁN
            </div>

            <div className="w-full px-2 py-2">
              <div className="mx-auto w-full max-w-md">
                <RadioGroup onChange={setSelectedPayment}>
                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <RadioGroup.Option
                        key={payment.name}
                        value={payment}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                              : ""
                          }
                  ${
                    checked ? "bg-sky-700 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium flex items-center justify-between ${
                                      checked ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    <FontAwesomeIcon
                                      icon={payment.icon}
                                      className="mr-3 text-[24px]"
                                    />
                                    {payment.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <CheckIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:mt-0 mt-4">
          <div className="border border-sky-300 rounded h-auto p-4 space-y-3">
            <p className="text-center font-bold text-[16px]">
              THÔNG TIN ĐƠN HÀNG
            </p>
            <div className="flex justify-between">
              <p>Giá vé</p>
              <p>
                {seatPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            {listFoods.map((food: Food) => (
              <div key={food.id}>
                {food.quantity > 0 && (
                  <div>
                    <div className="flex justify-between">
                      <p>
                        {food.title} x {food.quantity}
                      </p>
                      <p>
                        {(food.price * food.quantity).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-between font-bold text-[16px]">
              <p>Tổng</p>
              <p>
                {totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            <div className="flex justify-between font-bold text-[16px]">
              <p>Khuyến mãi</p>
              <p>
                {totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            <div className="flex justify-between font-bold text-[16px]">
              <p>Thanh toán</p>
              <p>
                {totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>

          <div className="border border-sky-300 rounded h-auto p-4 space-y-3">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">Countdown</div>
                <div className="text-6xl font-bold my-4">{`${minutes}:${seconds}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
