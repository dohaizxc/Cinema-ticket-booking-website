import { useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Movies } from "./Pages/Movies/Movies";
import { Cinemas } from "./Pages/Cinemas/Cinemas";
import { NotFound } from "./components/NotFound";
import { MovieDetails } from "./Pages/Movies/MovieDetails";
import { SelectSeats } from "./Pages/BookTicket/SelectSeats";
import { Booking } from "./Pages/BookTicket/Booking";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/cinema" element={<Cinemas />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
