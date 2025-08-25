import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Popular from "./pages/Popular/Popular";
import TopRated from "./pages/TopRated/TopRated";
import Upcoming from "./pages/Upcoming/Upcoming";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes className="mainContent">
                <Route path="/" element={<Navigate to="/popular" />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
