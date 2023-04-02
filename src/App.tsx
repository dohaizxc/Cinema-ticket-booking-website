import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Movies } from "./Pages/Movies/Movies";
import { Cinemas } from "./Pages/Cinemas/Cinemas";
import { NotFound } from "./components/NotFound";
import { MovieDetails } from "./Pages/Movies/MovieDetails";
import { Booking } from "./Pages/BookTicket/Booking";
import { LogIn } from "./Pages/Auth/LogIn";
import { SignUp } from "./Pages/Auth/SignUp";
import { Profile } from "./Pages/Auth/Profile";
import { Ticket } from "./Pages/BookTicket/Ticket";
import { NewsOffer } from "./Pages/NewsOffer/NewsOffer";
import { NewsOfferDetails } from "./Pages/NewsOffer/NewsOfferDetails";
import { MembershipPage } from "./Pages/NewsOffer/MembershipPage";
import { DarkMode } from "./components/DarkMode";
import { Layout } from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/cinema" element={<Cinemas />} />
          <Route path="/newsoffer" element={<NewsOffer />} />
          <Route path="/newsoffer/membership" element={<MembershipPage />} />
          <Route path="/newsoffer/detail/:id" element={<NewsOfferDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/test" element={<DarkMode />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
