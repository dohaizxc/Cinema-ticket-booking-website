import React, { useState } from "react";
import { SelectSeats } from "./SelectSeats";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { Food, Seat, Showtime } from "../../interface/Interface";
import { useNavigate, useParams } from "react-router-dom";
import { BuyFood } from "./BuyFood";
import { Payment } from "./Payment";
import { openNotification } from "../../components/Notifications";
import { usePost } from "../../api/post";
import { Modal } from "../../components/Modal/Modal";
import {
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Steps } from "../../components/Steps";

export const Booking = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { fetchGet: fetchShowtime, result: showtimeResult } =
    useGet<Showtime>();
  const {
    fetchPost: fetchBooking,
    result: bookingResult,
    isError,
  } = usePost<any>();
  const [step, setStep] = useState<number>(1);
  const [listSelectedSeats, setListSelectedSeats] = useState<Seat[]>([]);
  const [listFoods, setListFoods] = useState<Food[]>([]);
  const [foodPrice, setFoodPrice] = useState<number>(0);
  const [seatPrice, setSeatPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ageVerification, setAgeVerification] = useState<boolean>(false);

  const param = useParams();
  const id = param.id;
  React.useEffect(() => {
    fetchShowtime("showtime/" + id);
  }, []);

  const handlePreviousClick = (step: number) => {
    if (step > 2) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setStep(step - 1);
    } else if (step === 2) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setAgeVerification(false);
      setStep(step - 1);
    }
  };

  React.useEffect(() => {
    if (ageVerification) {
      setStep(2);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [ageVerification]);

  const handleNextClick = (step: number) => {
    if (step === 1) {
      if (seatPrice === 0) {
        openNotification("info", "Vui lòng chọn ghế để tiếp tục");
        return;
      } else {
        if (showtimeResult?.showtime.movieId.rated.substring(0, 1) === "P") {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setStep(step + 1);
        } else setOpenModal(true);
      }
    } else {
      if (step < 3) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setStep(step + 1);
      } else if (step === 3) {
        if (paymentMethod) {
          bookTicket();
        } else {
          openNotification("info", "Vui lòng chọn phương thức thanh toán");
        }
      }
    }
  };

  React.useEffect(() => {
    if (bookingResult) {
      if (!isError) {
        if (bookingResult?.ticket?.Showtime) {
          openNotification("success", "Thanh toán thành công");
          scroll(0, 0);
          navigate("/ticket/" + bookingResult?.ticket?._id);
        }
      } else {
        openNotification(
          "error",
          "Vé bạn chọn đã có người đặt, vui lòng đặt lại"
        );
      }
    }
  }, [bookingResult]);

  React.useEffect(() => {
    let price = 0;
    listFoods.map((food: Food) => {
      if (food.quantity > 0) {
        price += food.quantity * food.price;
      }
    });
    setFoodPrice(price);
  }, [listFoods]);

  React.useEffect(() => {
    let price = 0;
    listSelectedSeats?.map((seat: Seat) => {
      price += seat.price;
    });
    setSeatPrice(price);
  }, [listSelectedSeats]);

  React.useEffect(() => {
    setTotalPrice(foodPrice + seatPrice);
  }, [foodPrice, seatPrice]);

  React.useEffect(() => {}, [foodPrice, seatPrice]);

  const bookTicket = () => {
    let code: number[] = [];
    listSelectedSeats?.map((seat: Seat) => {
      code.push(seat.id);
    });

    let listFood: Food[] = [];

    listFoods.map((food: Food) => {
      if (food.quantity > 0) {
        listFood.push(food);
      }
    });

    fetchBooking(
      {
        showtime: id,
        user: user._id,
        seat: code,
        foods: listFood,
        paymentMethod: paymentMethod.name,
      },
      "ticket"
    );
  };

  return (
    <Layout>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setConfirm={setAgeVerification}
        title="Xác nhận độ tuổi"
        content={
          "Tôi xác nhận mua vé cho người xem từ " +
          showtimeResult?.showtime.movieId.rated.substring(1, 3) +
          " tuổi trở lên và hiểu rằng UIT CINEMA sẽ không hoàn tiền nếu không chứng thực độ tuổi của khán giả."
        }
      ></Modal>

      <div className="py-5">
        <Steps currentStep={step}></Steps>
      </div>

      {step === 1 && (
        <SelectSeats
          soldSeats={showtimeResult?.showtime.seats}
          setListSelectedSeats={setListSelectedSeats}
        ></SelectSeats>
      )}

      {step === 2 && <BuyFood setListFoods={setListFoods}></BuyFood>}

      {step === 3 && (
        <Payment
          seatPrice={seatPrice}
          listFoods={listFoods}
          totalPrice={totalPrice}
          setSelectedPayment={setPaymentMethod}
        ></Payment>
      )}

      <div className="md:sticky md:bottom-0 mx-auto md:py-0 py-10">
        {/* <div className="md:fixed md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:py-0 py-10"> */}
        <div className="relative">
          <div className="z-10 absolute md:top-1/2 bottom-[-10px] md:left-0 left-10 transform -translate-y-1/2">
            <button
              className="border-2 bg-gray-700 w-[75px] h-[75px] rounded-lg"
              onClick={() => handlePreviousClick(step)}
            >
              <i className="fa-sharp fa-solid fa-arrow-left text-[24px] mt-[13px] mx-[25px] text-white text-center"></i>
              <div className="text-[12px] text-white text-center">PREVIOUS</div>
            </button>
          </div>

          <div className="z-10 absolute md:top-1/2 bottom-[-10px] md:right-0 right-10 transform -translate-y-1/2">
            <button
              className="border-2 bg-sky-600 w-[75px] h-[75px] rounded-lg"
              onClick={() => handleNextClick(step)}
            >
              {step === 3 ? (
                <>
                  <i className="fa-solid fa-money-check-dollar text-[24px] mt-[13px] mx-[22px] text-white text-center"></i>
                  <div className="text-[12px] text-white text-center">
                    PAYMENT
                  </div>
                </>
              ) : (
                <>
                  <i className="fa-sharp fa-solid fa-arrow-right text-[24px] mt-[13px] mx-[25px] text-white text-center"></i>
                  <div className="text-[12px] text-white text-center">NEXT</div>
                </>
              )}
            </button>
          </div>

          <div className="relative md:h-auto h-[420px] flex md:flex-row md:space-x-5 space-x-0 flex-col md:space-y-0 space-y-5  lg:px-16 px-10 md:mx-20 mx-2 md:py-2 pt-5 bg-gradient-to-r from-sky-300 to-indigo-300 rounded">
            <div className="flex justify-center items-center space-x-5">
              <img
                src={showtimeResult?.showtime.movieId.image}
                className="w-[90px] h-[120px] rounded"
              ></img>
              <div className="flex flex-col justify-between space-y-1 lg:w-[300px] md:w-[200px] ">
                <p className="font-bold">
                  {showtimeResult?.showtime.movieId.rated.substring(0, 1) ===
                  "P" ? (
                    <span className="border border-green-600 rounded text-green-600 px-1 mr-1">
                      P
                    </span>
                  ) : (
                    <span className="border border-red-500 rounded text-red-500 px-1 mr-1">
                      {showtimeResult?.showtime.movieId.rated.substring(0, 3)}
                    </span>
                  )}
                  {showtimeResult?.showtime.movieId.name}
                </p>

                <div className="flex items-center">
                  <p className="font-semibold">
                    <MapPinIcon className="mr-2 h-5 w-5 inline-block" />
                    {showtimeResult?.cinema.name}
                  </p>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 inline-block" />
                  <p className="font-semibold">
                    {showtimeResult?.showtime.time} -{" "}
                    {showtimeResult?.showtime.time_end}
                  </p>
                </div>

                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-2 h-5 w-5 inline-block" />
                  {showtimeResult && (
                    <p className="font-semibold">
                      {new Date(
                        showtimeResult?.showtime.date
                      ).toLocaleDateString("en-UK")}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[150px] grid md:grid-rows-3 items-start md:pt-2">
              <p>
                Phòng:{" "}
                <span className="font-bold">
                  {showtimeResult?.showtime.roomId.name}
                </span>
              </p>

              <p className="row-span-2">
                Ghế:{" "}
                <span className="font-bold">
                  {listSelectedSeats?.map((seat: Seat) => {
                    if (
                      listSelectedSeats[listSelectedSeats.length - 1].id ==
                      seat.id
                    )
                      return <span key={seat.code}>{seat.code}</span>;
                    else return <span key={seat.code}>{seat.code}, </span>;
                  })}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 items-center w-[150px]">
              <div>Vé phim:</div>
              <div className="font-bold">
                {" "}
                {seatPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div>Combo:</div>
              <div className="font-bold">
                {foodPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div>Tổng:</div>
              <div className="font-bold text-xl">
                {" "}
                {totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40px]"></div>
    </Layout>
  );
};
