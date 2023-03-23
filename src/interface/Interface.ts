export interface Movie {
  name: string;
  image: string;
  director: string;
  actors: string;
  releaseDate: Date;
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
  date: Date;
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

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  dayOfBirth: Date;
  gender: string;
}

export interface NewsOffer {
  id: string;
  name: string;
  img: string;
  date: string;
  contents: string[];
  address: string;
  objects: string[];
  others: string[];
}
