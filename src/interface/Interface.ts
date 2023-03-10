import { Moment } from "moment";

export interface Movie {
  name: string;
  image: string;
  director: string;
  actors: string;
  releaseDate: string;
  genre: string[];
  duration: number;
  language: string;
  description: string;
  rated: string;
  trailer_url: string;
  _id: string;
}

export interface Province {
  name: string;
  _id: string;
}

export interface Cinema {
  name: string;
  address: string;
  address_url: URL;
  _id: string;
}

export interface ShowtimeDetails {
  date: string;
  name: string;
  time: string;
  time_end: string;
  seats: number[];
  _id: string;
  roomId: Room;
  movieId: Movie;
}

export interface Showtime {
  movie: Movie;
  showtimes: ShowtimeDetails[];
  cinema: Cinema;
  showtime: ShowtimeDetails;
}

export interface Seat {
  status: 0 | 1 | 2;
  type: string;
  code: string;
  price: number;
  id: number;
}

export interface Room {
  name: string;
  _id: number;
}

export interface Food {
  id: number;
  image: string;
  title: string;
  contents: string[];
  price: number;
  quantity: number;
}

export interface Ticket {
  _id: number;
  foods: Food[];
  seat: string;
  seatPrice: number;
  showtime: ShowtimeDetails;
  user: User;
  paymentMethod: string;
  movieName: string;
  cinemaName: string;
  movieImage: string;
  room: number;
  time: string;
  date: string;
  totalTicket: number;
  totalFood: number;
  id: number;
}

// _id
// 63959f387e34caeae509a119
// Showtime
// 63955c917be67376f0a565a0
// user
// 63957eccbb0e2229aa347bb0
// seat
// "J10, J11, J12, J13, J14, J15, J16, J17, J18, K13, K14, K15, K16"

// foods
// Array
// paymentMethod
// "momo"
// movieName
// "TRO TÀN RỰC RỠ"
// cinemaName
// "CGV Hùng Vương Plaza"
// time
// "11:30 - 13:27 ~ 117 phút"
// date
// "ngày 12 tháng 12 năm 2022"
// totalTicket
// 1040000
// totalFood
// 12696000
// id
// 1670750008474
// movieImage
// "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a…"

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  dayOfBirth: Moment;
  gender: string;
}
