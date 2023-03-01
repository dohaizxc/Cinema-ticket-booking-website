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
  type: string;
  code: string;
  price: number;
  id: number;
}

export interface Room {
  name: string;
  _id: number;
}
