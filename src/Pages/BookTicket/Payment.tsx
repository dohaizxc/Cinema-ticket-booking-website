import React, { useEffect, useState } from "react";
import { LineWithText } from "../../components/LineWithText";
import { TagsOutlined } from "@ant-design/icons";
import { Food } from "../../interface/Interface";

export const Payment: React.FC<{
  seatPrice: number;
  foodPrice: number;
  listFoods: Food[];
  totalPrice: number;
}> = ({ seatPrice, foodPrice, listFoods, totalPrice }) => {
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
      <LineWithText>THANH TOÁN</LineWithText>
      <div className="grid grid-cols-2 mx-20 space-x-10">
        <div className="space-y-4">
          <div className="border border-sky-300 rounded h-auto p-4 space-y-3">
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
            <div className="flex flex-col space-y-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radioGroup"
                  value="option1"
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded-sm focus:ring-0"
                />
                <i className="mx-3 fa-brands fa-cc-visa text-[30px]"></i>
                <span className="text-[16px]">Thẻ Visa</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radioGroup"
                  value="option2"
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded-sm focus:ring-0"
                />
                <i className="mx-3 fa-brands fa-cc-mastercard text-[30px]"></i>
                <span className="text-[16px]">Thẻ MasterCard</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radioGroup"
                  value="option3"
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded-sm focus:ring-0"
                />
                <i className="mx-3 fa-brands fa-cc-paypal text-[30px]"></i>
                <span className="text-[16px]">PayPal</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
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
              <div>
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
