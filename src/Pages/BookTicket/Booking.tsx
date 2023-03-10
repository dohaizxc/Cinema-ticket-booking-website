import React, { useState } from "react";
import { SelectSeats } from "./SelectSeats";
import { Layout } from "../../components/Layout";
import { LineWithText } from "../../components/LineWithText";
import { useGet } from "../../api/get";
import { Food, Seat, Showtime, Ticket } from "../../interface/Interface";
import { useNavigate, useParams } from "react-router-dom";
import { BuyFood } from "./BuyFood";
import { Payment } from "./Payment";
import { openNotification } from "../../components/Notifications";
import { usePost } from "../../api/post";
import { Modal } from "../../components/Modal/Modal";

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
  const [type, setType] = useState<number>(1);
  const [listSelectedSeats, setListSelectedSeats] = useState<Seat[]>([]);
  const [listFoods, setListFoods] = useState<Food[]>([]);
  const [foodPrice, setFoodPrice] = useState<number>(0);
  const [seatPrice, setSeatPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const param = useParams();
  const id = param.id;
  React.useEffect(() => {
    fetchShowtime("showtime/" + id);
  }, []);

  const handlePreviousClick = (type: number) => {
    if (type > 1) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setType(type - 1);
    }
  };

  const handleNextClick = (type: number) => {
    if (type === 1) {
      if (seatPrice === 0) {
        openNotification("info", "Vui lòng chọn ghế để tiếp tục");
        return;
      } else {
        setOpenModal(true);
        // window.scroll({
        //   top: 0,
        //   left: 0,
        //   behavior: "smooth",
        // });
        // setType(type + 1);
      }
    } else {
      if (type < 3) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setType(type + 1);
      } else if (type === 3) {
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
          navigate("/ticket/" + bookingResult?.ticket?._id);
        }
      } else {
        console.log("bookingResult", bookingResult);
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
        setType={setType}
      ></Modal>
      {type != 3 && (
        <div>
          <LineWithText>BOOKING ONLINE</LineWithText>
          <div className="font-bold px-32 text-[18px]">
            <div>
              {showtimeResult?.cinema.name} | Phòng{" "}
              {showtimeResult?.showtime.roomId.name} | Số ghế (240/240)
            </div>
            <div>
              {showtimeResult?.showtime.date.substring(0, 10)} |{" "}
              {showtimeResult?.showtime.time} -{" "}
              {showtimeResult?.showtime.time_end}
            </div>
          </div>
        </div>
      )}

      {type === 1 && (
        <SelectSeats
          soldSeats={showtimeResult?.showtime.seats}
          setListSelectedSeats={setListSelectedSeats}
        ></SelectSeats>
      )}

      {type === 2 && <BuyFood setListFoods={setListFoods}></BuyFood>}

      {type === 3 && (
        <Payment
          seatPrice={seatPrice}
          listFoods={listFoods}
          totalPrice={totalPrice}
          setSelectedPayment={setPaymentMethod}
        ></Payment>
      )}

      <div className="grid place-items-center h-52 bg-gradient-to-r from-sky-300 to-indigo-300 my-[50px] mx-[70px]">
        <div className="grid grid-cols-9">
          <div
            className="border-2 bg-gray-700 w-[75px] h-[75px] rounded-lg mx-auto my-auto  cursor-pointer"
            onClick={() => handlePreviousClick(type)}
          >
            <i className="fa-sharp fa-solid fa-arrow-left text-[24px] mt-[13px] mx-[25px] text-white text-center"></i>
            <div className="text-[12px] text-white text-center">PREVIOUS</div>
          </div>
          <img src={showtimeResult?.showtime.movieId.image}></img>

          <div className="col-span-2 pl-5">
            <div className="font-bold">
              {showtimeResult?.showtime.movieId.name}
            </div>
            <div>{showtimeResult?.showtime.movieId.rated.substring(0, 3)}</div>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <div>Rạp:</div>
            <div className="font-bold">{showtimeResult?.cinema.name}</div>
            <div>Suất chiếu:</div>
            <div className="font-bold">
              {showtimeResult?.showtime.time + ","}
              <div> {showtimeResult?.showtime.date.substring(0, 10)}</div>
            </div>
            <div>Phòng chiếu:</div>
            <div className="font-bold">
              {showtimeResult?.showtime.roomId.name}
            </div>
            <div>Ghế:</div>
            <div className="font-bold">
              {listSelectedSeats?.map((seat: Seat) => (
                <span key={seat.code}>{seat.code}, </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2  col-span-2">
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
            <div className="font-bold">
              {" "}
              {totalPrice.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>

          <div
            className="border-2 bg-sky-600 w-[75px] h-[75px] rounded-lg mx-auto my-auto cursor-pointer"
            onClick={() => handleNextClick(type)}
          >
            {type === 3 ? (
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
          </div>
        </div>
      </div>
    </Layout>
  );
};
